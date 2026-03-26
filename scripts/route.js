document.addEventListener("DOMContentLoaded", () => {
	const routeAlert = document.querySelector(".route-alert");
	const routePopup = document.querySelector(".route-alert-popup");
	const acceptButton = document.querySelector(".route-alert-popup .accept-button");
	const denyButton = document.querySelector(".route-alert-popup .deny-button");
	const routeLines = Array.from(document.querySelectorAll(".route-line"));
	const stepsSheet = document.querySelector(".steps-sheet");
	const stepsSheetPopup = document.querySelector(".steps-sheet-popup");
	const routePage = document.querySelector(".route-page");
	const accessibilityFab = document.querySelector(".accessibility-fab");
	const accessibilityPopup = document.querySelector(".accessibility-popup");
	const accessibilityYesButton = document.querySelector(".accessibility-popup .accept-button");
	const accessibilityNoButton = document.querySelector(".accessibility-popup .deny-button");

	let isAccessibleRoute = false;

	if (!routeAlert || !routePopup || !acceptButton || !denyButton || routeLines.length === 0) {
		return;
	}

	// Start hidden until the user taps the alert symbol.
	routePopup.style.display = "none";

	const originalRoute = [
		{ left: "28px", top: "168px", width: "42px", height: "5px" },
		{ left: "65px", top: "168px", width: "5px", height: "116px" },
		{ left: "65px", top: "279px", width: "170px", height: "5px" },
		{ left: "230px", top: "279px", width: "5px", height: "168px" }
	];

	const alternateRoute = [
		{ left: "28px", top: "168px", width: "112px", height: "5px" },
		{ left: "136px", top: "170px", width: "5px", height: "270px" },
		{ left: "136px", top: "435px", width: "95px", height: "5px" },
		{ left: "230px", top: "337px", width: "5px", height: "103px" }
	];

	const applyRoute = (routeState) => {
		routeLines.forEach((line, index) => {
			const state = routeState[index];
			if (!state) {
				return;
			}
			line.style.left = state.left;
			line.style.top = state.top;
			line.style.width = state.width;
			line.style.height = state.height;
		});
	};

	applyRoute(originalRoute);

	routeAlert.addEventListener("click", () => {
		routePopup.style.display = "flex";
	});

	acceptButton.addEventListener("click", () => {
		applyRoute(alternateRoute);
		routePopup.style.display = "none";
	});

	denyButton.addEventListener("click", () => {
		applyRoute(originalRoute);
		routePopup.style.display = "none";
		routeAlert.style.display = "none";
	});

	if (stepsSheet && stepsSheetPopup) {
		stepsSheet.addEventListener("click", () => {
			stepsSheetPopup.classList.add("open");
			stepsSheet.style.display = "none";
		});

		stepsSheetPopup.addEventListener("click", () => {
			stepsSheetPopup.classList.remove("open");
			stepsSheet.style.display = "flex";
		});
	}

	// Open popup from fab
	if (accessibilityFab && accessibilityPopup) {
		accessibilityPopup.style.display = "none";

		accessibilityFab.addEventListener("click", () => {
			accessibilityPopup.style.display = "flex";
		});
	}

	// Confirm accessibility mode toggle
	if (accessibilityYesButton && accessibilityPopup) {
		accessibilityYesButton.addEventListener("click", () => {
			isAccessibleRoute = true;
			applyRoute(alternateRoute);
			document.documentElement.style.setProperty("--route-page-bg-0", "#697DB8");
			document.documentElement.style.setProperty("--route-page-bg-1", "#36B7C0");
			document.documentElement.style.setProperty("--route-line-color", "#2c5fa8");
			routePage.classList.add("accessible-mode");
			accessibilityPopup.style.display = "none";
		});
	}

	// Disable accessibility route on No
	if (accessibilityNoButton && accessibilityPopup) {
		accessibilityNoButton.addEventListener("click", () => {
			isAccessibleRoute = false;
			applyRoute(originalRoute);
			document.documentElement.style.setProperty("--route-page-bg-0", "#F12236");
			document.documentElement.style.setProperty("--route-page-bg-1", "#ff3b61");
			document.documentElement.style.setProperty("--route-line-color", "#ff2f59");
			routePage.classList.remove("accessible-mode");
			accessibilityPopup.style.display = "none";
		});
	}
});
