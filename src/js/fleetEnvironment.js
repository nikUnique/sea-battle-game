import * as GlobalVars from "./globalVars";
let markup = GlobalVars.seaFleet
  .map(
    (item, i) => `
     <tr class="row-${i + 1}">
<th>${item}</th>
 ${GlobalVars.letters
   .map(
     (letter) =>
       `<td class="dropzone"><div class="${letter}${i + 1} cell" ></div></td>`
   )
   .join("")}
</tr>
`
  )
  .join("");

let markupSeaHead = ` ${GlobalVars.seaFleet
  .map((_, i) => {
    return i > 0
      ? `<th>${GlobalVars.letters[i]}</th>`
      : `<th class='empty-cell'></th> 
        <th>${GlobalVars.letters[i]}</th>`;
  })

  .join("")}`;

[
  GlobalVars.mySideMyFleet,
  GlobalVars.mySideEnemyFleet,
  GlobalVars.enemySideEnemyFleet,
  GlobalVars.enemySideMyFleet,
].forEach((container) => container.insertAdjacentHTML("afterbegin", markup));

[...GlobalVars.seas].forEach((sea) =>
  sea.querySelector("tr").insertAdjacentHTML("afterbegin", markupSeaHead)
);

const seas = [...document.querySelectorAll(".sea")];

const selectAllThs = function (el, borderSide) {
  seas
    .map((sea) => {
      return [...sea.querySelector(`${el}`)?.querySelectorAll("th")];
    })
    .flat()
    .filter((th) => {
      return th.textContent !== "";
    })
    .forEach((th) => {
      th.style[borderSide] = "1px solid #fcc419";
    });
};

selectAllThs("thead", "borderBottom");
selectAllThs("tbody", "borderRight");
