
using com.lt.education as my from '../db/educational-schema';

service EducationalService {
  entity Educational_Details as projection on my.Educational_Details;
  entity Educational_History as projection on my.Educational_History;
  entity Employee as projection on my.Employee;
  entity SFData as projection on my.SFData;
}