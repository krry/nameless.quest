<template>
	.modal-overlay(v-if="isVisible" @click.self="handleBackdropClick") .modal-content.rel
	.close.abs.t.r(@click="close") ⓧ h1.head.xl What is your name? p.subtitle Welcome to the Journal.
	Let's start by learning who you are. .form-group input.input.lg( v-model="inputName" type="text"
	placeholder="Your name..." @keyup.enter="handleSubmit" ref="inputRef" ) .button-group.flex.row.mid
	button.btn.lg.outline(@click="close") Cancel button.btn.lg(@click="handleSubmit"
	:disabled="!inputName.trim()") Continue
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { setUserName } from '../store/userProfile';

export default defineComponent({
	name: 'NamePromptModal',
	props: {
		isVisible: {
			type: Boolean,
			required: true,
		},
	},
	emits: {
		'name-submitted': (name: string) => typeof name === 'string',
		'modal-closed': () => true,
	},
	setup(props, { emit }) {
		const inputName = ref('');
		const inputRef = ref<HTMLInputElement | null>(null);

		onMounted(() => {
			// Auto-focus input when modal becomes visible
			if (props.isVisible && inputRef.value) {
				inputRef.value.focus();
			}
		});

		const handleSubmit = () => {
			const name = inputName.value.trim();
			if (name) {
				setUserName(name);
				emit('name-submitted', name);
				inputName.value = '';
			}
		};

		const close = () => {
			emit('modal-closed');
		};

		const handleBackdropClick = () => {
			// Don't close on backdrop click for this critical modal
		};

		return {
			inputName,
			inputRef,
			handleSubmit,
			close,
			handleBackdropClick,
		};
	},
});
</script>

<style lang="postcss" scoped>
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9999;
}

.modal-content {
	background-color: var(--silk);
	border-radius: 12px;
	padding: 2rem;
	max-width: 400px;
	width: 90%;
	box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.close {
	cursor: pointer;
	font-size: 1.5rem;
	color: var(--ink);
	opacity: 0.5;
	transition: opacity 0.2s;
	padding: 0.5rem;

	&:hover {
		opacity: 1;
	}
}

.subtitle {
	margin: 1rem 0 1.5rem;
	color: var(--ink);
	opacity: 0.7;
}

.form-group {
	margin-bottom: 1.5rem;
}

.input {
	width: 100%;
	padding: 0.75rem;
	border: 2px solid var(--ink);
	border-radius: 6px;
	font-size: 1rem;
	font-family: inherit;
	color: var(--ink);
	background-color: var(--sky);

	&:focus {
		outline: none;
		border-color: var(--ink);
		box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
	}

	&::placeholder {
		color: var(--ink);
		opacity: 0.5;
	}
}

.button-group {
	gap: 0.75rem;

	button {
		flex: 1;

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}
}
</style>
