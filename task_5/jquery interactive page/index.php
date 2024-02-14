<!DOCTYPE html>
<html lang="en">
<head>
    
    <title>jQuery Interactive Page</title>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>

</head>
<body>

    <h1>jQuery Interactive Page</h1>

    <button id="toggleButton">Toggle Elements</button>

    <div id="elementToToggle" class="hidden">
        <p>This element can be toggled.</p>
    </div>

    <div id="fadeElement" class="hidden">
        <p>This element will fade in/out.</p>
    </div>

    <script>
        $(document).ready(function () {

            // Toggle 
            $("#toggleButton").click(function () {
                $("#elementToToggle").toggle();
            });

            // Fade
            $("#fadeElement").hover(
                function () {
                    $(this).fadeIn();
                },
                function () {
                    $(this).fadeOut();
                }
            );
        });
    </script>

</body>
</html>
