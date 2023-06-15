### Ejecución al inicializar la extensión

Para ejecutar algo cuando se inicializa la extensión se puede poner un listener en el background.js:

```javascript
chrome.runtime.onStartup.addListener(() => {
  console.log(`onStartup()`);
});
```

### Ejecución al recibir un click

En el background.js se puede poner un listener para el click en el icono de la extensión:

```javascript
chrome.action.onClicked.addListener((tab) => {
  // lo que se quier hacer al recibir el click
});
```

Pero si se especifica en el manifest.json que la extensión tiene un popup, el listener no se ejecuta, se muestra el popup y se ejecuta el código que haya en el popup.js

### Cambio del .html del popup

Para cambiar el .html del popup se puede usar el método setPopup() de la API de chrome. En el ejemplo se cambia según si el usuario está logueado o no:

```javascript
chrome.storage.local.get(["signed_in"], (data) => {
  if (data.signed_in) {
    chrome.action.setPopup({ popup: "/popup/popup_signin.html" });
  } else {
    chrome.action.setPopup({ popup: "/popup/popup.html" });
  }
});
```

### Cambio del badge

Se puede cambiar el texto y el color del badge de la extensión:

```javascript
chrome.action.setBadgeText({ text: "ON" });
chrome.action.setBadgeBackgroundColor({ color: "#4688F1" });
```
