<script lang="ts">
	import { superForm } from "sveltekit-superforms/client";
	import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";

	import type { PageData } from "./$types";

	import { signinSchema } from "$lib/schemas/signin.schema";

	export let data: PageData;

	const { form, errors, enhance, capture, restore, delayed, timeout, message } = superForm(
		data.form,
		{
			validators: signinSchema,
			timeoutMs: 2000,
		},
	);

	export const snapshot = { capture, restore };
</script>

<SuperDebug data={$form} />

<form
	method="POST"
	use:enhance
>
	<label for="username">Username</label>
	<input
		bind:value={$form.username}
		data-invalid={$errors.username}
		id="username"
		name="username"
		type="text"
	/>
	{#if $errors.username}<span class="invalid">{$errors.username}</span>{/if}

	<label for="password">Password</label>
	<input
		bind:value={$form.password}
		data-invalid={$errors.password}
		id="password"
		name="password"
		type="password"
	/>
	{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}

	<div><button>Submit</button></div>

	{#if $message}
		<div class="message">{$message}</div>
	{/if}

	{#if $timeout}
		<span class="timeout">Timeout.</span>
	{:else if $delayed}
		<span class="delayed">Working...</span>
	{/if}
</form>

<style>
	input {
		@apply text-slate-800;
	}
	.invalid {
		@apply text-red-500;
	}
</style>
