var rowCount = 0;
function firstTable() {
    addRow();
}

function addRow() {
    var table = document.getElementById("table");
    var categoryRow = document.createElement("tr");
    var enterRow = document.createElement("tr");
    var newLabel = document.getElementById("newCategory").value;
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var text1 = document.createElement("input");
    var text2 = document.createElement("input");
    text1.setAttribute("id", "text1");
    text2.setAttribute("id", "text2");
    if (newLabel.length == 0 && rowCount == 0) {
        newLabel = "Homework";
    }
    if (newLabel.length == 0 && rowCount > 0) {
        alert("Please put in a category!!");
    } else if (rowCount >= 6) {
        alert("No more than 6 categories");
    }else if(newLabel.length>0) {
        td1.innerHTML = newLabel + " Points";
        td2.innerHTML = newLabel + " Weight";
        table.appendChild(categoryRow);
        table.appendChild(enterRow);
        categoryRow.appendChild(td1);
        categoryRow.appendChild(td2);
        enterRow.appendChild(td3);
        enterRow.appendChild(td4);
        td3.appendChild(text1);
        td4.appendChild(text2);
        text1.setAttribute("id", "1-" + rowCount);
        text2.setAttribute("id", "2-" + rowCount);
        text1.setAttribute("placeholder", "Ex: 100,95,76");
        text2.setAttribute("placeholder", "Ex: 35");
        rowCount++;
        color(categoryRow, enterRow);
    }
}

function color(row1, row2) {
    if (rowCount % 5 == 0) {
        row1.setAttribute("class", "green");
        row2.setAttribute("class", "green");
    }else if (rowCount % 5 == 1) {
        row1.setAttribute("class", "gray");
        row2.setAttribute("class", "gray");
    }else if (rowCount % 5 == 2){
        row1.setAttribute("class", "magenta");
        row2.setAttribute("class", "magenta");
    }else if(rowCount%5== 3) {
        row1.setAttribute("class", "blue");
        row2.setAttribute("class", "blue");
    }else if(rowCount%5 == 4){
        row1.setAttribute("class", "aqua");
        row2.setAttribute("class", "aqua");
    }
}

function onSubmit() {
    var grade = calcCurrentGrade();
    if(grade>=0 || grade<=100){
        document.getElementById("grade").innerHTML= grade + "%";
        document.getElementById("semesterGrade").innerHTML = "This is your current grade: ";
    }else{
        alert("Geez pal perhaps you should look at those grades again, looks like you messed up");
    }
}

function calcGradeNeeded() {
    var semesterGrade = calcCurrentGrade();
    var gradeDesired = document.getElementById("desiredGrade").value;
    var finalWeight = document.getElementById("finalWeight").value;
    var currentWeight = 1 - (finalWeight / 100);
    var weightedCurrent = currentWeight * semesterGrade;
    var need = (gradeDesired - weightedCurrent) / (finalWeight / 100);
    if (gradeDesired >= 0 && gradeDesired <= 100 && finalWeight >= 0 && finalWeight <= 100) {
        document.getElementById("finalGrade").innerHTML = need + "%";
        document.getElementById("message").innerHTML = "You will need to receive the following grade on the " +
            "Final to retain a " + gradeDesired + ": ";
    }else{
        alert("All the values have to be between 0 and 100!");
    }
}
function calcCurrentGrade() {
    var weight = "";
    var totalOfWeight = 0;
    for( var i=0; i<rowCount; i++){
        if(i<rowCount-1){
            weight += document.getElementById("2-" +i).value + ",";
        }else{
            weight += document.getElementById("2-" +i).value;
        }
    }
    weight = convertArrayToInt(weight);
    var grade = 0;
    for(var j = 0; j<rowCount; j++){
        var manyAssigns = document.getElementById("1-" + j).value;
        manyAssigns = convertArrayToInt(manyAssigns);
        var averageOfHW = averageArray(manyAssigns);
        var relativeWeight = weight[j]/100;
        grade += averageOfHW*relativeWeight;
    }
    return grade;
}

function convertArrayToInt(string) {
    var string = string.split(",");
    for(var i=0; i<string.length; i++){
        string[i] = parseInt(string[i]);
    }
    return string;
}
function averageArray(array){
    var length = array.length;
    var sum = 0;
    for(var i=0; i<length; i++){
        sum += array[i];
    }
    var average = (sum)/(length);
    return average;
}