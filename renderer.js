function dark_toggle() {
    var el1 = document.getElementById("dark-reader");
    if(el1.disabled) {
        el1.disabled = false;
        localStorage.setItem("darkreader", "enabled");
    } else {
        el1.disabled = true;
        localStorage.setItem("darkreader", "disabled");
    }
}

if (localStorage.getItem("darkreader") == "enabled") {
    document.getElementById("dark-reader").disabled = false;
   }

else {
    document.getElementById("dark-reader").disabled = true;
   }