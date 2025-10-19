import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export const useAppStore = createStore(
  persist(
    (set, get) => ({
      language: "tr",
      setLanguage: (language) => set({ language }),

      loading: false,
      error: null,
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      selectedEmployee: null,
      employees: [],
      fetchEmployees: async () => {
        const { employees } = get();
        if (employees.length > 0) {
          return;
        }
        set({ loading: true, error: null });
        try {
          const response = await fetch("/public/employees.json");
          if (!response.ok) {
            throw new Error(`Failed to fetch employees: ${response.statusText}`);
          }
          const data = await response.json();
          set({ employees: data, loading: false });
        } catch (error) {
          set({ loading: false, error: error.message });
          throw error;
        }
      },
      getEmployees: () => {
        return get().employees;
      },
      getEmployeeById: async (id) => {
        const { employees } = get();
        if (employees.length === 0) {
          await get().fetchEmployees();
        }
        const { employees: updatedEmployees } = get();
        const employee = updatedEmployees.find((employee) => employee.id === id) || null;
        set({ selectedEmployee: employee });
      },
      addEmployee: (employee) => {
        set((state) => ({
          employees: [employee, ...state.employees],
        }));
      },
      updateEmployee: (id, updatedEmployee) => {
        set((state) => ({
          employees: state.employees.map((employee) =>
            employee.id === id ? { ...employee, ...updatedEmployee } : employee,
          ),
        }));
      },
      deleteEmployee: (id) => {
        set((state) => ({
          employees: state.employees.filter((employee) => employee.id !== id),
        }));
      },
    }),
    {
      name: "app-storage",
      partialize: (state) => ({
        language: state.language,
        employees: state.employees,
      }),
    },
  ),
);
