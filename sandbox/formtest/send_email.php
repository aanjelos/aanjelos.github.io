<?php
    // Set the recipient email address
    $to = 'aanjelo99@gmail.com';
    // Get the sender's name and email address from the form
    $name = $_POST['name'];
    $email = $_POST['email'];
    // Build the email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n" . $_POST['message'];
    // Build the email headers
    $email_headers = "From: $name <$email>";
    // Send the email
    mail($to, 'New Contact Form Submission', $email_content, $email_headers);
    // Redirect to the index.html page
    header('Location: index.html');
?>
