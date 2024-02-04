import {
  seaFleet,
  letters,
  seaFleet,
  mySideMyFleet,
  mySideEnemyFleet,
  enemySideEnemyFleet,
  enemySideMyFleet,
  seas,
} from "./globalVars";

let markup = seaFleet
  .map(
    (item, i) => `
     <tr class="row-${i + 1}">
<th>${item}</th>
 ${letters
   .map(
     (letter) =>
       `<td class="dropzone"><div class="${letter}${i + 1} cell"></div></td>`
   )
   .join("")}
</tr>
`
  )
  .join("");

let markupSeaHead = ` ${seaFleet
  .map((_, i) => {
    return i > 0
      ? `<th>${letters[i]}</th>`
      : `<th class='empty-cell'></th> 
        <th>${letters[i]}</th>`;
  })

  .join("")}`;

[
  mySideMyFleet,
  mySideEnemyFleet,
  enemySideEnemyFleet,
  enemySideMyFleet,
].forEach((container) => container.insertAdjacentHTML("afterbegin", markup));

[...seas].forEach((sea) =>
  sea.querySelector("tr").insertAdjacentHTML("afterbegin", markupSeaHead)
);

const selectAllThs = function (el, borderSide) {
  const seas = [...document.querySelectorAll(".sea")]
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
