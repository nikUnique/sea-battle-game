import * as GlobalVars from "./globalVars";
const markup = GlobalVars.seaFleet
  .map(
    (item, i) => `
    <tr class="row-${i + 1}">
<th>${item}</th>
 ${GlobalVars.letters
   .map(
     (letter) =>
       `<td class=" dropzone"><div class="${letter}${i + 1} cell" ></div></td>`
   )
   .join("")}
</tr>
`
  )
  .join("");

const markupSeaHead = ` ${GlobalVars.seaFleet
  .map((_, i) => {
    return i > 0
      ? `<th>${GlobalVars.letters[i]}</th>`
      : `<th></th> 
        <th>${GlobalVars.letters[i]}</th>`;
  })
  .join("")}`;

[
  GlobalVars.mySideMyFleet,
  GlobalVars.mySideEnemyFleet,
  GlobalVars.enemySideEnemyFleet,
  GlobalVars.enemySideMyFleet,
].forEach((container) => container.insertAdjacentHTML("afterbegin", markup));

console.log(
  `${GlobalVars.mySideMyFleet.querySelector(".F10").classList[0]}`,
  "bomba"
);

[...GlobalVars.seas].forEach((sea) =>
  sea.querySelector("tr").insertAdjacentHTML("afterbegin", markupSeaHead)
);
