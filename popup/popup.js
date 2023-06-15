const API_URL = "http://localhost:3025";

const buttonGoToOptions = document.querySelector("#go-to-options");
const buttonCerrar = document.querySelector("#cerrar");
const buttonSaveOne = document.querySelector("#saveOne");
const buttonSaveAll = document.querySelector("#saveAll");

const savedLabel = document.querySelector("#label");
const titulo = document.querySelector("#titulo");

function getFormattedDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const day = ("0" + now.getDate()).slice(-2);
  const hours = ("0" + now.getHours()).slice(-2);
  const minutes = ("0" + now.getMinutes()).slice(-2);
  const seconds = ("0" + now.getSeconds()).slice(-2);

  const currentDateTime =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  return currentDateTime;
}

function getActiveTabURL() {
  return chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log("medio", tabs[0].url);
    return tabs[0].url;
  });
}

function showSavedLabel() {
  savedLabel.classList.remove("hidden");
  titulo.classList.add("hidden");
  buttonGoToOptions.classList.add("hidden");
  savedLabel.innerHTML = "✅ ¡Guardado!";
  setTimeout(() => {
    savedLabel.classList.add("hidden");
    titulo.classList.remove("hidden");
    buttonGoToOptions.classList.remove("hidden");
  }, 2000);
}

buttonCerrar.addEventListener("click", function () {
  window.close();
});

buttonGoToOptions.addEventListener("click", function () {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL("options.html"));
  }
});

buttonSaveOne.addEventListener("click", async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const { tituloUna } = await chrome.storage.local.get("tituloUna");

  const note = {
    id: getFormattedDateTime(),
    noteText: "🔹 " + tabs[0].title + " (" + tabs[0].url + ")",
    noteHTML: "🔹 " + tabs[0].title + " (" + tabs[0].url + ")",
    noteTitle: tituloUna,
    tags: "Link",
    category: "",
    deleted: false,
    archived: false,
    reminder: "",
    rating: 0,
    created: getFormattedDateTime(),
    modified: getFormattedDateTime(),
  };

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  })
    .then((res) => {
      showSavedLabel();
      return res; // para ver el statustext usar: console.log(res.text());
    })
    .catch((error) => {
      console.error("hay error", error);
    });
});

buttonSaveAll.addEventListener("click", async () => {
  const tabs = await chrome.tabs.query({ currentWindow: true });

  const tabsURLs = tabs
    .map((tab) => {
      return "🔹 " + tab.title + " (" + tab.url + ")";
    })
    .join("<BR>");

  const { tituloSesion } = await chrome.storage.local.get("tituloSesion");

  const note = {
    id: getFormattedDateTime(),
    noteText: tabsURLs,
    noteHTML: tabsURLs,
    noteTitle: tituloSesion,
    tags: "Link, Sesión",
    category: "",
    deleted: false,
    archived: false,
    reminder: "",
    rating: 0,
    created: getFormattedDateTime(),
    modified: getFormattedDateTime(),
  };

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  })
    .then((res) => {
      showSavedLabel();

      return res;
    })
    .catch((error) => {
      console.error("hay error", error);
    });

  // close popup
  //      window.close();
});
