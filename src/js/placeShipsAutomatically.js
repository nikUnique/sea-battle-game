export default function (fleet) {
  // A variable for ship which will be dragged which should be accessbile in several functions
  let dragged;

  const shipEls = fleet.querySelectorAll(".ship");

  shipEls.forEach((shipEl, i) => {
    // Adding to every ship part an identification name
    shipEl.classList.add(`cell${i + 1}`);
    shipEl.setAttribute("draggable", true);
  });

  fleet.addEventListener("dragstart", function (e) {
    console.log("DRAGSTART");
    console.log(e.target);
    // Dragged ship is assigned to dragged variable to use later when drop event happens
    dragged = e.target;
  });

  // fleet.addEventListener("dragend", function (e) {
  //   console.log("DRAGEND", e.target);

  // });

  ["dragover", "dragenter", "dragleave", "drop"].forEach((ev) => {
    fleet.addEventListener(
      ev,
      function (e) {
        console.log(ev, e.target, "ran");

        // When a ship leaves its cell then dragover class is removed from that cell and that class also removed when drop event happens
        if (ev === "dragleave" || "drop") {
          e.target.classList.contains("dropzone")
            ? (console.log(ev), e.target.classList.remove("dragover"))
            : "";
        }

        if (ev === "drop") {
          e.preventDefault();
          console.log(dragged, e.target);

          // Prevent dropping on ships
          if (e.target.classList.contains("ship")) return;

          // Ship placed inside dropzone(or td element)
          e.target.appendChild(dragged);

          // For example: cell5
          const shipPartIdentifier =
            dragged.classList[dragged.classList.length - 1];

          console.log(shipPartIdentifier);

          // Replace ship class which defines position of a ship with class of a cell where the ship was dropped
          fleet
            .querySelector(`.${shipPartIdentifier}`)
            .classList.replace(
              fleet.querySelector(`.${shipPartIdentifier}`).classList[0],
              e.target.querySelector("div")?.classList[0]
            );
        }

        const checkDragoverE = function () {
          e.preventDefault();

          if (ev !== "dragover") return;

          if (
            e.target.classList.contains("ship") /* ||
            e.target.classList.length === 0 */
          ) {
            return;
          }
          // Adds background color to the cell over which a ship hovers
          e.target.classList.add("dragover");
        };

        checkDragoverE();
      },
      // Stop event bubbling(if I am not mistaken)
      ev === "dragover" && false
    );
  });
}
