export default function (fleet) {
  let dragged;

  const shipEls = fleet.querySelectorAll(".ship");

  shipEls.forEach((shipEl, i) => {
    shipEl.classList.add(`cell${i + 1}`);
    shipEl.setAttribute("draggable", true);
  });

  const cells = [...fleet.querySelectorAll("td")].filter((cell) => {
    return !cell.classList.contains("ship");
  });

  cells.forEach((cell) => {
    cell.classList.add("dropzone");
  });

  fleet.addEventListener("dragstart", function (e) {
    console.log("DRAGSTART");
    console.log(e.target);
    dragged = e.target;
  });

  // fleet.addEventListener("dragend", function (e) {
  //   console.log("DRAGEND", e.target);

  // });

  ["dragover", "dragenter", "dragleave", "drop"].forEach((ev) => {
    fleet.addEventListener(
      ev,
      function (e) {
        e.target.classList.contains("dropzone")
          ? (console.log(ev), e.target.classList.remove("dragover"))
          : "";

        if (ev === "drop") {
          e.preventDefault();
          console.log(dragged, e.target);

          if (e.target.classList.contains("ship")) return;

          e.target.appendChild(dragged);

          const shipPartIdentifier =
            dragged.classList[dragged.classList.length - 1];

          console.log(shipPartIdentifier);

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
            e.target.classList.contains("ship") ||
            e.target.classList.length === 0
          ) {
            return;
          }

          e.target.classList.add("dragover");
        };

        checkDragoverE();
      },
      ev === "dragover" && false
    );
  });
}
