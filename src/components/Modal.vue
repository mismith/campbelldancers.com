<template>
  <aside class="modal-container" :class="{ open }" @click="close">
    <div class="modal" @click.stop>
      <slot />
    </div>
    <button class="close">&times;</button>
  </aside>
</template>

<script>
export default {
  name: 'modal',
  props: {
    open: true,
  },
  methods: {
    close() {
      this.$emit('update:open', false);
    },

    handleEsc({ keyCode }) {
      if (keyCode === 27) this.close();
    },
  },
  mounted() {
    window.addEventListener('keyup', this.handleEsc);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handleEsc);
  },
};
</script>

<style lang="postcss">
@import '../variables.css';

.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1010;

  & .modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 200px;
    min-height: 200px;
    max-width: 90%;
    max-height: 90%;
    background-color: var(--lightest);
    border: double 3px var(--accent);
    overflow: auto;
  }
  & .close {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 50px;
    min-height: 50px;
    background: none;
    color: var(--lightest);
    font-size: 24px;
    border: 0;

    &:not(:hover) {
      opacity: 0.5;
    }
  }
  &:not(.open) {
    display: none;
  }
}
</style>
