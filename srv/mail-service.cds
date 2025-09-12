using { cuid } from '@sap/cds/common';

service MailService {
  action sendEmail(to: String, subject: String, body: String) returns String;
}
