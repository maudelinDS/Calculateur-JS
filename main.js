if (typeof (localStorage.getItem("grades")) == 'undefined') {


    // Je déclare mon objet avec les mème id que mes tables sur le HTML, en metant toutes les braches et les semestres
    let gradesObject = {
        ecole_pro: {
            semestre1: [],
        },
        ecole_inter: {
            semestre1: [],
        },
        comp_elargie: {
            branches: {
                math: {
                    semestre1: [],
                    semestre2: [],
                    semestre3: [],
                },
                anglais: {
                    semestre1: [],
                    semestre2: [],
                    semestre3: [],
                    semestre4: [],
                    semestre5: [],
                },
            },
        },
        culture_G: {
            semestres: {
                semestres: {

                    semestre1: [],
                    semestre2: [],
                    semestre3: [],
                    semestre4: [],
                    semestre5: [],
                    semestre6: [],
                    semestre7: [],
                    semestre8: [],
                }

            }
        },
        TPI: {
            semestre1: [],
        },
    };
}
else {

    let gradesObject = JSON.parse(localStorage.getItem('grades'));

    //ADD Button
    let inputAdd = document.getElementsByName("add");

    let tableGrades = []
    let avg

    for (const input of inputAdd) {

        let tableGrades = []

        input.addEventListener("click", (e) => {
            let id = e.target.id.split("-")
            //grade
            id[0] = "grade"
            let gradeInput = parseFloat(document.getElementById(id.join("-")).value);
            //description
            id[0] = "description";
            let descInput = document.getElementById(id.join("-")).value;
            // Table ID
            id[0] = "table";
            let tablesID = document.getElementById(id.join("-"));
            // Radio ID
            id[0] = "radio";
            let radioID = document.querySelector("input[class=radio]:checked");
            // Spann ID
            id[0] = "average";
            let spanID = document.getElementById(id.join("-"));
            id[0] = "averageFinal";
            let spanIdFinal = document.getElementById(id.join("-"));

            if (gradeInput <= 6 && gradeInput >= 1) {

                tableGrades.push(gradeInput)
                insertRowInTable(tablesID, gradeInput, descInput)

                avg = (Math.round(2 * average(tableGrades)) / 2);
                spanID.innerHTML = avg

                console.log(avg);


                // for (const span of spans) {
                //     console.log(span.innerHTML);
                // }

                // let vv = document.getElementsByTagName('span')[0];
                // console.log(vv.textContent);


                if (radioID != null) {

                    console.log(radioID);
                    let splitId = radioID.id.split("-");

                    gradesObject[splitId[1]][splitId[2]][splitId[3]][splitId[4]].push(gradeInput)
                    console.log(gradesObject);

                    let math = document.getElementById('average-comp_elargie-branches-math-semestre1')
                    let anglais = document.getElementById('average-comp_elargie-branches-anglais-semestre1')

                    let cultureG = document.getElementById('average-culture_G-semestres-semestres-semestre1')

                    let cultureTarget = document.getElementById('averageFinal-culture_G-semestres')

                    let targetMathEtAnglais = document.getElementById('averageFinal-comp_elargie-branches')

                    let text1 = math.textContent;
                    let text2 = anglais.textContent;
                    let text3 = targetMathEtAnglais.textContent;
                    let text4 = cultureG.textContent;

                    let math1 = parseFloat(text1)
                    let anglais1 = parseFloat(text2)

                    console.log(math1);
                    console.log(anglais1);

                    let lesDeux = (math1 += anglais1) / 2

                    targetMathEtAnglais.innerHTML = lesDeux

                    cultureTarget.innerHTML = text4


                }
                if (radioID == null) {
                    let splitId = input.id.split("-");

                    gradesObject[splitId[1]][splitId[2]].push(gradeInput)
                    spanIdFinal.innerHTML = avg


                    console.log(gradesObject);



                }

            }

            else {
                alert("Ta note n'est pas valable");

            }

            let tr = document.getElementsByName("averageFinal1")

            // let avg1 = parseFloat(tr[0].textContent * 0.3)
            let avg1 = parseFloat(tr[0].textContent * 0.2.toFixed(1))
            let avg2 = parseFloat(tr[1].textContent * 0.8.toFixed(1))



            let compInfo = (avg1 += avg2) * 0.3
            let compDeBase = (tr[2].textContent) * 0.1
            let cultG = (tr[3].textContent) * 0.2
            let tpi = (tr[4].textContent) * 0.4

            let cfc = (compInfo + compDeBase + cultG + tpi).toFixed(1);
            console.log(cfc);

            let spanFin = document.getElementById("averageTotal")



            spanFin.innerHTML = cfc

            let bravo = document.getElementById("averageTotal1")


            if (cfc >= 4) {


                bravo.textContent = "Tu as obbtenu le CFC"
                spanFin.style.color = "green"

            }
            else {
                bravo.textContent = "Tu n'as pas obbtenu le CFC"
                spanFin.style.color = "red"


            }

        })
    }
    //Remove Button
    let inputRemove = document.getElementsByName("remove");


    for (const input of inputRemove) {
        //     console.log(input);
        input.addEventListener("click", (e) => {
            let id = e.target.id.split("-")
            let gradeInput = parseFloat(document.getElementById(id.join("-")).value);
            //description
            id[0] = "description";
            let descInput = document.getElementById(id.join("-")).value;
            // Table ID
            id[0] = "table";
            let tablesID = document.getElementById(id.join("-"));
            //Radio ID
            id[0] = "radio";
            let radioID = document.querySelector("input[class=radio]:checked");

            // tableGrades.splice(tableGrades.length - 1);

            avg = (Math.round(2 * average(tableGrades)) / 2);



            if (radioID == null) {
                let splitId = input.id.split("-");

                removeGrade(splitId[2], splitId[1])

            }
            else {
                let splitId = radioID.id.split("-");

                gradesObject[splitId[1]][splitId[2]][splitId[3]][splitId[4]].pop(gradeInput)

            }
            console.log(gradesObject);

            if (tablesID.rows.length > 1) {
                deleteRowInTable(tablesID)

            }
            else {
                alert("not row in the table")
            }


        })
    }

    // insert une nouvelle une liggne dans le bon tableau
    function insertRowInTable(idTable, grade, desc) {
        var row = idTable.insertRow(-1);
        row.insertCell(0).textContent = grade
        row.insertCell(1).textContent = desc
    }
    // efface une nouvelle une liggne dans le bon tableau
    function deleteRowInTable(idTable) {

        idTable.deleteRow(-1);
    }

    // insert la note dans le bon tableau dans l'object avec l'id de l'input
    function insertGradeInObjectWithInputId(branche, semestre, grade) {
        gradesObject[branche][semestre].push(grade)
        // [splitId[2]][splitId[3]].push(grade);
    }
    function removeGrade(semestre, matiere) {
        gradesObject[matiere][semestre].splice([-1]);

    }
    // Compute average
    function average(gradesArray) {
        let sum = 0
        for (const grade of gradesArray) {

            sum += grade
        }
        return sum / gradesArray.length
    }

}

