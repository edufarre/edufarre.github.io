function dispShapeForm(cShape) {
        document.getElementById("infPanel").style.display = 'block';
        document.getElementById("backGround").style.display = 'none';
        document.getElementById("MusicP").style.display = 'none';
        document.getElementById("boxInf").style.display = 'none';
        if (cShape == 1) {
            document.getElementById("s1").style.display = 'block';
            document.getElementById("s2").style.display = 'none';
            document.getElementById("s3").style.display = 'none';
        } else if (cShape == 2) {
            document.getElementById("s1").style.display = 'none';
            document.getElementById("s2").style.display = 'block';
            document.getElementById("s3").style.display = 'none';
        } else if (cShape == 3){
            document.getElementById("s1").style.display = 'none';
            document.getElementById("s2").style.display = 'none';
            document.getElementById("s3").style.display = 'block';
        }
}
function showInfo (mySel) {
    if(mySel.shape==1){
        document.getElementById("X").value = mySel.x;
        document.getElementById("Y").value = mySel.y;
    } else {
        document.getElementById("X").value = mySel.x;
        document.getElementById("Y").value = mySel.y;
    }
    document.getElementById("Filled").checked = mySel.filled;
    document.getElementById("Color").value = mySel.fill;
    
    if(mySel.shape==1){
        document.getElementById("W").value = mySel.w;
        document.getElementById("H").value = mySel.h;    
    }
    else if(mySel.shape==2){
        document.getElementById("Radi").value = mySel.rad;
        document.getElementById("Start Angle").value = mySel.start;
        document.getElementById("End Angle").value = mySel.end; 
    }
    else if(mySel.shape==3){
        document.getElementById("Tsize").value = mySel.size;
    }
  dispShapeForm(mySel.shape);  
}