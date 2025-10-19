import { expect } from "@open-wc/testing";
import { useAppStore } from "../src/store/store.js";

describe("useAppStore", () => {
  beforeEach(() => {
    useAppStore.setState({
      language: "tr",
      loading: false,
      error: null,
      selectedEmployee: null,
      employees: [],
    });
  });

  it("has default state", () => {
    const state = useAppStore.getState();
    expect(state.language).to.equal("tr");
    expect(state.employees).to.deep.equal([]);
  });

  it("can set language", () => {
    const { setLanguage } = useAppStore.getState();
    setLanguage("en");
    expect(useAppStore.getState().language).to.equal("en");
  });

  it("can add employee", () => {
    const { addEmployee } = useAppStore.getState();
    const employee = { id: "1", firstName: "Kutay" };
    addEmployee(employee);
    expect(useAppStore.getState().employees).to.deep.equal([employee]);
  });

  it("can update employee", () => {
    const { addEmployee, updateEmployee } = useAppStore.getState();
    addEmployee({ id: "1", firstName: "Kutay" });
    updateEmployee("1", { firstName: "K" });
    expect(useAppStore.getState().employees[0].firstName).to.equal("K");
  });

  it("can delete employee", () => {
    const { addEmployee, deleteEmployee } = useAppStore.getState();
    addEmployee({ id: "1", firstName: "Kutay" });
    deleteEmployee("1");
    expect(useAppStore.getState().employees).to.deep.equal([]);
  });
});
