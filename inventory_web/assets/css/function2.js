function openNav2() {
    document.getElementById("mySidenav2").style.width = "17.5%";
    document.getElementById("mySidenav2").style.marginLeft = "17.5%";
    document.getElementById("main1").style.marginLeft = "35%";
}

function closeNav2() {
    document.getElementById("mySidenav2").style.width = "0";
    document.getElementById("main1").style.marginLeft= "17.5%";
}


function openNav1() {
    document.getElementById("mySidenav1").style.width = "17.5%";
    document.getElementById("main1").style.marginLeft= "17.5%";
    document.getElementById("kategorije0").style.visibility = "visible";
    document.getElementById("kategorije1").style.visibility = "visible";
    document.getElementById("kategorije2").style.visibility = "visible";
    document.getElementById("kategorije3").style.visibility = "visible";
    document.getElementById("kategorije4").style.visibility = "visible";
    document.getElementById("closebtn1").style.visibility = "visible";
    document.getElementById("openkategorije").style.visibility = "hidden";

    var a = document.getElementById("mySidenav2").style.width;
    if (a!="0px") {

    document.getElementById("main1").style.marginLeft= "35%";
    document.getElementById("mySidenav2").style.marginLeft = "17.5%";
    } else{

    document.getElementById("main1").style.marginLeft= "17.5%";

    }
}

function closeNav1() {
    document.getElementById("mySidenav1").style.width = "3%";
    document.getElementById("kategorije0").style.visibility = "hidden";
    document.getElementById("kategorije1").style.visibility = "hidden";
    document.getElementById("kategorije2").style.visibility = "hidden";
    document.getElementById("kategorije3").style.visibility = "hidden";
    document.getElementById("kategorije4").style.visibility = "hidden";
    document.getElementById("closebtn1").style.visibility = "hidden";
    document.getElementById("openkategorije").style.visibility = "visible";


    var a = document.getElementById("mySidenav2").style.width;
    console.log(a);
    console.log("ddddd");
    if (a!="0px") {

    document.getElementById("main1").style.marginLeft= "20.5%";
    document.getElementById("mySidenav2").style.marginLeft = "3%";
    } else{

    document.getElementById("main1").style.marginLeft= "3%";

    }
}
