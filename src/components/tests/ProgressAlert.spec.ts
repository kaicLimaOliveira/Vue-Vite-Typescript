import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProgressAlert from "../ProgressAlert.vue";
import { useAlertStore } from "../../stores/alertStore";
import { createPinia, setActivePinia } from "pinia";


vi.mock("../../stores/alertStore", () => {
  return {
    useAlertStore: vi.fn(() => ({
      alerts: [
        { type: "success", title: "Success!", content: "Action was successful.", icon: "check" },
        { type: "error", title: "Error!", content: "There was an error.", icon: "exclamation" },
      ],
      remove: vi.fn(),
    })),
  };
});

describe("ProgressAlert", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should renders alerts correctly based on alertStore data", () => {
    const wrapper = mount(ProgressAlert);
    const alerts = wrapper.findAll(".alert-container");

    expect(alerts.length).toBe(2);
    expect(alerts[0].classes()).toContain("success");
    expect(alerts[0].find(".column-content-title").text()).toBe("Success!");
    expect(alerts[1].classes()).toContain("error");
    expect(alerts[1].find(".column-content-title").text()).toBe("Error!");
  });

  // it("should call alertStore.remove when clicking on the alert", async () => {
  //   const wrapper = mount(ProgressAlert);
  //   const alertStore = useAlertStore();

  //   await wrapper.find("[data-test='alert-remove']").trigger("click");

  //   expect(alertStore.remove).toHaveBeenCalledTimes(1);
  //   expect(alertStore.remove).toHaveBeenCalledWith({
  //     type: "success",
  //     title: "Success!",
  //     content: "Action was successful.",
  //     icon: "check",
  //   });
  // });

  // it("chama alertStore.remove ao clicar no ícone de remoção", async () => {
  //   const alertStore = useAlertStore();
  //   const removeSpy = vi.spyOn(alertStore, 'remove').mockImplementation(() => {});
  
  //   const wrapper = mount(ProgressAlert);
  //   console.log(wrapper.find('[data-test="alert-remove"]'));
    
  
  //   await wrapper.find("[data-test='alert-remove']").trigger("click");
  
  //   expect(removeSpy).toHaveBeenCalledTimes(1);
  
  //   removeSpy.mockRestore();
  // });
});
