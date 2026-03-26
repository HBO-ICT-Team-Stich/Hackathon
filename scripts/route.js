document.addEventListener("DOMContentLoaded", () => {
	const routeAlert = document.querySelector(".route-alert");
	const routePopup = document.querySelector(".route-alert-popup");
	const acceptButton = document.querySelector(".route-alert-popup .accept-button");
	const denyButton = document.querySelector(".route-alert-popup .deny-button");
	const routeLines = Array.from(document.querySelectorAll(".route-line"));
	const stepsSheet = document.querySelector(".steps-sheet");
	const stepsSheetPopup = document.querySelector(".steps-sheet-popup");

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
});
