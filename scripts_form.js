$(document).ready(function () {
    let stepHistory = [];

    // Function to show a specific step
    function showStep(stepClass) {
        $('#multistep-form .steps').addClass('d-none');
        $(stepClass).removeClass('d-none');
    }

    // Function to update the visibility of previous button
    function updatePreviousButtonVisibility() {
        if (stepHistory.length > 1) {
            $('#previous').show();
        } else {
            $('#previous').hide();
        }
    }

    // Clear localStorage initially
    localStorage.clear();

    // Handle previous button click
    $("#previous").click(function () {
        if (stepHistory.length > 1) {
            stepHistory.pop(); // Remove the current step
            const prevStepClass = stepHistory[stepHistory.length - 1]; // Get the previous step
            showStep(prevStepClass);
        }

        updatePreviousButtonVisibility();
        console.log(stepHistory);
    });

    // Handle next button click
    $('#next').on('click', function (e) {
        e.preventDefault();
        const currentForm = $('#multistep-form .steps:not(.d-none)');
        const textformareaValue = currentForm.find('#textformarea').val();  // Get the value of the textarea
        const InputRadio = currentForm.find('input[type="radio"]:checked').val();
        let flag = true;
        const currentStepClass = '.' + currentForm.attr('class').split(' ').filter(c => c !== 'd-none').join('.');

        if (!stepHistory.includes(currentStepClass)) {
            stepHistory.push(currentStepClass); // Push the current step to the history
        }

        // Conditional starts here
        if (currentStepClass.includes('.step-two')) {
            if (InputRadio === "Yes") {
                showStep('.steps.step-three');
                if (!stepHistory.includes('.steps.step-three')) {
                    stepHistory.push('.steps.step-three'); // Push the next step to the history
                }
            } else if (InputRadio === "No") {
                showStep('.steps.step-four');
                if (!stepHistory.includes('.steps.step-four')) {
                    stepHistory.push('.steps.step-four'); // Push the conditional step to the history
                }
            }
            flag = false;
        }

        if (currentStepClass.includes('.step-four')) {
            if (InputRadio === "Married") {
                showStep('.steps.step-five');
                if (!stepHistory.includes('.steps.step-five')) {
                    stepHistory.push('.steps.step-five');
                }
            } else if (InputRadio === "Single") {
                showStep('.steps.step-eleven');
                if (!stepHistory.includes('.steps.step-eleven')) {
                    stepHistory.push('.steps.step-eleven');
                }
            } else if (InputRadio === "Live-in partner") {
                showStep('.steps.step-eleven');
                if (!stepHistory.includes('.steps.step-eleven')) {
                    stepHistory.push('.steps.step-eleven');
                }
            }
            flag = false;
        }

        if (flag) {
            const nextStepClass = '.' + currentForm.next('.steps').attr('class').split(' ').filter(c => c !== 'd-none').join('.');
            if (!stepHistory.includes(nextStepClass)) {
                stepHistory.push(nextStepClass); // Push the next step to the history
            }
            currentForm.addClass('d-none');
            currentForm.next('.steps').removeClass('d-none');
        }

        console.log(stepHistory);

        updatePreviousButtonVisibility();
    });

    // Initially show the first step
    showStep('.steps.step-one');

    // Hide the previous button initially if only one step is in history
    updatePreviousButtonVisibility();
});
