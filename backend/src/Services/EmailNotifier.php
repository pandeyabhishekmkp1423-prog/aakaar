<?php
declare(strict_types=1);

/**
 * Lead Notification Service
 */

class EmailNotifier {
    public static function notifyNewEnquiry(array $config, array $enquiry): void {
        $mailConfig = $config['mail'];
        if (!$mailConfig['enabled']) {
            // Write to log for audit
            $logMsg = sprintf(
                "[%s] New Enquiry from %s (%s) for %s: %s\n",
                date('Y-m-d H:i:s'),
                $enquiry['name'],
                $enquiry['email'],
                $enquiry['service'],
                substr($enquiry['message'], 0, 100)
            );
            file_put_contents(dirname(__DIR__, 2) . '/storage/logs/enquiries.log', $logMsg, FILE_APPEND);
            return;
        }

        $to = $mailConfig['admin_notification_email'];
        $subject = "New Project Enquiry: " . $enquiry['service'] . " - " . $enquiry['name'];
        $fromName = $mailConfig['from_name'];
        $fromEmail = $mailConfig['from_address'];

        $body = "New software inquiry received via Aakaar Digital:\n\n";
        $body .= "Name: " . $enquiry['name'] . "\n";
        $body .= "Email: " . $enquiry['email'] . "\n";
        $body .= "Phone: " . ($enquiry['phone'] ?: 'N/A') . "\n";
        $body .= "Company: " . ($enquiry['company'] ?: 'N/A') . "\n";
        $body .= "Service: " . $enquiry['service'] . "\n";
        $body .= "IP Address: " . ($enquiry['ip_address'] ?? 'N/A') . "\n";
        $body .= "Date: " . date('Y-m-d H:i:s') . "\n\n";
        $body .= "Project Requirements / Message:\n";
        $body .= $enquiry['message'] . "\n\n";
        $body .= "Access Admin Portal to manage this lead: " . $config['app']['admin_url'] . "/admin/enquiries\n";

        $headers = [
            "From: {$fromName} <{$fromEmail}>",
            "Reply-To: {$enquiry['name']} <{$enquiry['email']}>",
            "X-Mailer: PHP/" . phpversion(),
            "Content-Type: text/plain; charset=UTF-8",
        ];

        @mail($to, $subject, $body, implode("\r\n", $headers));
    }
}

