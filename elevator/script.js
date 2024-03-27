//this is our timer for how long it takes the elevator to move from one floor to the next
function delay(t, val) {
    return new Promise((resolve) => setTimeout(resolve, t, val));
}

// this moves our elevator up and down on the page
// based on which button the user pushed
function animateElevator(floorNumber) {
    const car = document.getElementById("car");
    car.innerHTML = floorNumber;
    if (floorNumber === "1") {
        car.style.bottom = "0px";
    } else {
        car.style.bottom = floorNumber * 18.3 + "px";
    }

    return new Promise(function (resolve, reject) {
        resolve();
    });
}

function validate(floorNumber, e) {
    return new Promise(function (resolve, reject) {
        //after we have reached our specific floor, we then remove the button that's lit up
        // and then go to our next floor in local storage.
        e.target.classList.remove("active");
        resolve();
    });
}

function setterGetter(floor, e) {
    // here we set the floors that have been pushed so that we know
    // what floor the users should go to next. we put this value in
    // localstorage
    var requestedFloor = JSON.parse(
        localStorage.getItem("requestedFloor") || "[]"
    );
    // Modifying
    var newFloor = {
        floor: floor
    };
    requestedFloor.push(newFloor);

    // Saving the new floor to the list of floors that
    // the elevator needs to go to
    localStorage.setItem("requestedFloor", JSON.stringify(requestedFloor));
}

// this is the method we call that
function goTo(e) {
    var floorNumber = e.target.getAttribute("data-floor-number");
    setterGetter(floorNumber, e);
    var button_num = parseInt(floorNumber);
    this.classList.add("active");

    return delay(3000).then(function () {
        animateElevator(floorNumber).then(function () {
            return delay(100).then(function () {
                return validate(floorNumber, e);
            });
        });
    });
}

// set up the click event in the dom for the buttons
// instead of hard wiring a click event to each dom element
var elements = document.getElementsByClassName("btn");
Array.from(elements).forEach(function (element) {
    element.addEventListener("click", goTo);
});
