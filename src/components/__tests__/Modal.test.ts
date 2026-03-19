import { describe, it, expect, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import Modal from "@/components/Modal.vue";

describe("Modal", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const getModal = () => document.body.querySelector(".modal") as HTMLElement;
  const getOverlay = () =>
    document.body.querySelector(".modal-overlay") as HTMLElement;

  it("displays message", () => {
    mount(Modal, {
      props: { message: "Test message" },
      attachTo: document.body,
    });
    expect(getModal().textContent).toContain("Test message");
  });

  it("displays default message if message is not provided", () => {
    mount(Modal, { attachTo: document.body });
    expect(getModal().textContent).toContain("Are you sure?");
  });

  it("displays confirm button with provided text", () => {
    mount(Modal, {
      props: { confirmText: "Yes" },
      attachTo: document.body,
    });
    expect(getModal().textContent).toContain("Yes");
  });

  it("does not display cancel button if cancelText is not provided", () => {
    mount(Modal, { attachTo: document.body });
    const buttons = document.body.querySelectorAll("button");
    expect(buttons).toHaveLength(1);
  });

  it("displays cancel button if cancelText is provided", () => {
    mount(Modal, {
      props: { cancelText: "No" },
      attachTo: document.body,
    });
    const buttons = document.body.querySelectorAll("button");
    expect(buttons).toHaveLength(2);
  });

  it("emits confirm event when confirm button is clicked", async () => {
    const wrapper = mount(Modal, {
      props: { confirmText: "OK" },
      attachTo: document.body,
    });
    const btn = document.body.querySelector(
      ".modal__btn--confirm",
    ) as HTMLElement;
    btn.click();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("confirm")).toHaveLength(1);
  });

  it("emits cancel event when cancel button is clicked", async () => {
    const wrapper = mount(Modal, {
      props: { cancelText: "Cancel" },
      attachTo: document.body,
    });
    const btn = document.body.querySelector(
      ".modal__btn--cancel",
    ) as HTMLElement;
    btn.click();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("cancel")).toHaveLength(1);
  });

  it("emits cancel event when overlay is clicked", async () => {
    const wrapper = mount(Modal, { attachTo: document.body });
    const overlay = getOverlay();
    overlay.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("cancel")).toHaveLength(1);
  });
});
