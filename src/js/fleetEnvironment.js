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

{
  /* <th>${item}</th> */
}
let markup = seaFleet
  .map(
    (item, i) => `
     <tr class="row-${i + 1}">
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
{
  /* <th class='empty-cell'></th> */
}
let markupSeaHead = ` ${seaFleet
  .map((_, i) => {
    return i > 0
      ? `<th>${letters[i]}</th>`
      : ` 
        <th>${letters[i]}</th>`;
  })

  .join("")}`;

// let markupLetters = ` ${seaFleet
//   .map((item, i) => {
//     return `<p class="column-letter column-letter-${i + 1}">${letters[i]}</p>`;
//   })

//   .join("")}`;

let markupNumbers = ` ${seaFleet
  .map((item, i) => {
    return `<p class="row-number row-number-${i + 1}">${i + 1}</p>`;
  })

  .join("")}`;

[
  mySideMyFleet,
  mySideEnemyFleet,
  enemySideEnemyFleet,
  enemySideMyFleet,
].forEach((container) => {
  container.insertAdjacentHTML("afterbegin", markup);
});

[...seas].forEach((sea) => {
  sea.querySelector("tr").insertAdjacentHTML("afterbegin", markupSeaHead);
  // sea.insertAdjacentHTML("afterbegin", markupLetters);
  sea.insertAdjacentHTML("afterbegin", markupNumbers);
});

// [...seaContainers].forEach((seaContainer) => {
//   seaContainer.insertAdjacentHTML("afterbegin", markupLetters);
//   seaContainer.insertAdjacentHTML("afterbegin", markupNumbers);
// });
