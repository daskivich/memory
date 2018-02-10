// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html";

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket"

function form_init() {

  // let channel = socket.channel("games:demo", {});
  //
  // channel.join()
  //   .receive("ok", resp => { console.log("Joined successfully", resp); })
  //   .receive("error", resp => { console.log("Unable to join", resp); });
  //

  $('#game-input').keyup(() => {
    let xx = $('#game-input').val();
    let url = "/game/".concat(xx);
    $('#join-link').attr("href", url);
  });

  // $('#game-button').click(() => {
  //   let xx = $('#game-input').val();
  //   channel.push("name", { xx: xx })
  //   .receive("greeted", msg => {
  //     $('#game-output').text(msg.yy);
  //   });
  // });
}

import run_memory from "./memory";

function init() {
  let root = document.getElementById('game');

  if (root) {
    let channel = socket.channel("games:" + window.gameName, {});

    // channel.join()
    //   .receive("ok", resp => { console.log("Joined successfully", resp); })
    //   .receive("error", resp => { console.log("Unable to join", resp); });

    run_memory(root, channel);
  }

  if (document.getElementById('index-page')) {
    form_init();
  }
}

// Use jQuery to delay until page loaded.
$(init);
