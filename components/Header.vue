<script setup lang="ts">
	const route = useRoute()
</script>

<template>
	<header
		class="max-w-7xl flex items-center justify-between w-full py-6 mx-auto"
	>
		<h1 class="text-3xl font-bold text-purple-400">Timetrackr</h1>
		<nav>
			<ul class="flex space-x-6">
				<li>
					<NuxtLink
						:class="
							route.path == '/' &&
							'text-purple-400 border-b-2 border-purple-400'
						"
						class="p-3"
						to="/"
						>Home</NuxtLink
					>
				</li>
				<li>
					<NuxtLink
						:class="
							route.path == '/projects' &&
							'text-purple-400 border-b-2 border-purple-400'
						"
						class="p-3"
						to="/projects"
						>Projects</NuxtLink
					>
				</li>
			</ul>
		</nav>
	</header>
</template>
