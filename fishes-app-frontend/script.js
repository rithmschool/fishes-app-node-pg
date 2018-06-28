$(document).ready(function() {
  const $container = $("#container");
  $.getJSON("http://localhost:3000/fishes").then(function(fishes) {
    fishes.forEach(function(fish) {
      let $newFish = $("<li>", {
        html: `
            ${fish.name} ${fish.type}
            <button class="delete">X</button>
        `,
        "data-id": `${fish.id}`
      });
      $container.append($newFish);
    });
  });

  $("#new-fish-form").on("submit", function(e) {
    e.preventDefault();
    const name = $("#name").val();
    const type = $("#type").val();
    $.post("http://localhost:3000/fishes", { name, type }).then(function(fish) {
      let $newFish = $("<li>", {
        html: `
            ${fish.name} ${fish.type}
            <button class="delete">X</button>
        `,
        "data-id": `${fish.id}`
      });
      $container.append($newFish);
      $("#new-fish-form").trigger("reset");
    });
  });

  $container.on("click", ".delete", function(e) {
    e.preventDefault();
    const id = $(e.target)
      .parent()
      .data("id");
    $.ajax({
      method: "DELETE",
      url: `http://localhost:3000/fishes/${id}`
    }).then(function() {
      $(e.target)
        .parent()
        .remove();
    });
  });
});
