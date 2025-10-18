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

      employees: [],
      getEmployees: async () => {
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

      getEmployeeByIndex: (index) => {
        const { employees } = get();
        return employees[index] || null;
      },

      addEmployee: (employee) => {
        set((state) => ({
          employees: [...state.employees, employee],
        }));
      },

      updateEmployee: (index, updatedEmployee) => {
        set((state) => ({
          employees: state.employees.map((emp, i) => (i === index ? { ...emp, ...updatedEmployee } : emp)),
        }));
      },

      deleteEmployee: (index) => {
        set((state) => ({
          employees: state.employees.filter((_, i) => i !== index),
        }));
      },
    }),
    {
      name: "app-storage",
      partialize: (state) => ({
        employees: state.employees,
      }),
    },
  ),
);
