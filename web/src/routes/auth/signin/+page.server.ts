import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";

import type { Actions, PageServerLoad } from "./$types";

import { signinSchema } from "$lib/schemas/signin.schema";

export const load = (async ({ locals }) => {
	// const session = await locals.auth.validate();
	// if (session) throw redirect(302, "/");

	return {
		form: superValidate(signinSchema),
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, signinSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { username, password } = form.data;

		try {
			// const key = await auth.useKey("username", username, password);
			// const session = await auth.createSession(key.userId);
			// locals.auth.setSession(session);
		} catch (error) {
			console.error(error);
			return fail(400, { form });
		}
		throw redirect(302, "/");
	},
};
