<template>
  <Teleport to="body">
    <div class="modal-overlay" @mousedown.self="emit('cancel')">
      <div class="modal" role="dialog" aria-modal="true">
        <p class="modal__message">
          {{ message }}
        </p>
        <div class="modal__actions">
          <button
            v-if="cancelText"
            class="modal__btn modal__btn--cancel"
            @click="emit('cancel')"
          >
            {{ cancelText }}
          </button>
          <button
            class="modal__btn modal__btn--confirm"
            @click="emit('confirm')"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string;
    confirmText?: string;
    cancelText?: string;
  }>(),
  {
    message: "Are you sure?",
    confirmText: "OK",
  },
);

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
  animation: fade-in 0.15s ease;
}

.modal {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 28px 24px;
  width: 100%;
  max-width: 360px;
  margin: 0 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: slide-up 0.15s ease;
}

.modal__message {
  font-size: 1rem;
  color: var(--color-text);
  text-align: center;
  margin-bottom: 24px;
  line-height: 1.5;
}

.modal__actions {
  display: flex;
  gap: 10px;
}

.modal__btn {
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: opacity 0.2s;
}

.modal__btn:hover {
  opacity: 0.85;
}

.modal__btn--cancel {
  background: var(--color-border);
  color: var(--color-text);
}

.modal__btn--confirm {
  background: #ef5350;
  color: #ffffff;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    transform: translateY(12px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
