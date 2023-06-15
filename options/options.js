const tituloUnaElement = document.getElementById("tituloUna");
const tituloSesionElement = document.getElementById("tituloSesion");

chrome.storage.local.get("tituloUna", ({ tituloUna }) => {
  tituloUnaElement.value = tituloUna || "Enlace guardado desde Chrome";
});

const botonGuardar = document.getElementById("botonGuardar");

chrome.storage.local.get("tituloSesion", ({ tituloSesion }) => {
  tituloSesionElement.value = tituloSesion || "Sesión guardada desde Chrome";
});

botonGuardar.addEventListener("click", () => {
  chrome.storage.local.set({ tituloUna: tituloUnaElement.value });
  chrome.storage.local.set({ tituloSesion: tituloSesionElement.value });
  botonGuardar.disabled = true;
});

botonGuardar.disabled = true;

const inputs = document.querySelectorAll(".title-input");
console.log(inputs);
inputs.forEach((input) => {
  input.addEventListener("keypress", () => {
    console.log("holi");
    botonGuardar.disabled = false;
  });
});

/* // Saves options to chrome.storage
const saveOptions = () => {
  const color = document.getElementById("color").value;
  const likesColor = document.getElementById("like").checked;

  chrome.storage.sync.set(
    { favoriteColor: color, likesColor: likesColor },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(() => {
        status.textContent = "";
      }, 750);
    }
  );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    { favoriteColor: "red", likesColor: true },
    (items) => {
      document.getElementById("color").value = items.favoriteColor;
      document.getElementById("like").checked = items.likesColor;
    }
  );
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
 */
