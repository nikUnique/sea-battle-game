export default function (fleet) {
  let dragged;
  const shipEls = fleet.querySelectorAll(".ship");

  shipEls.forEach((shipEl, i) => {
    shipEl.classList.add(`cell${i + 1}`);
  });

  const cells = [...fleet.querySelectorAll("td")].filter((cell) => {
    return !cell.classList.contains("ship");
  });

  cells.forEach((cell) => {
    cell.classList.add("dropzone");
  });

  shipEls.forEach((shipEl) => {
    shipEl.setAttribute("draggable", true);
  });

  fleet.addEventListener("dragstart", function (e) {
    console.log("DRAGSTART");
    console.log(e.target);
    dragged = e.target;
  });

  fleet.addEventListener("dragend", function (e) {
    console.log("DRAGEND", e.target);
    fleet.querySelector(`.${dragged.classList[dragged.classList.length - 1]}`);
  });

  ["dragover", "dragenter", "dragleave", "drop"].forEach((ev) => {
    fleet.addEventListener(
      ev,
      function (e) {
        e.target.classList.contains("dropzone")
          ? (console.log(ev),
            e.target.classList.remove("dragover"),
            ev === "drop"
              ? (e.preventDefault(),
                console.log(dragged),
                e.target.appendChild(dragged),
                fleet
                  .querySelector(
                    `.${dragged.classList[dragged.classList.length - 1]}`
                  )
                  .classList.replace(
                    fleet.querySelector(
                      `.${dragged.classList[dragged.classList.length - 1]}`
                    ).classList[0],
                    e.target.querySelector("div").classList[0]
                  ))
              : "")
          : "";

        const checkDragoverE = function () {
          e.preventDefault();
          if (e !== "dragover") return;
          if (
            e.target.classList.contains("ship") ||
            e.target.classList.length === 0
          )
            return;
          e.target.classList.add("dragover");
        };

        checkDragoverE();
      },
      ev === "dragover" && false
    );
  });
}
