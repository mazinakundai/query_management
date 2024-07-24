from django.core.exceptions import ValidationError
from django.db import models


class Query(models.Model):
    QUERY_TYPES = [
        ('Payslip', 'Payslip Query'),
        ('Timesheet', 'Timesheet Query'),
        ('Roster', 'Roster Query'),
    ]

    STATUS_CHOICES = [
        ('Open', 'Open'),
        ('Resolved', 'Resolved'),
    ]

    query_id = models.AutoField(primary_key=True)
    query_type = models.CharField(max_length=20, choices=QUERY_TYPES)
    employee_name = models.CharField(max_length=100)
    branch = models.CharField(max_length=100)
    site = models.CharField(max_length=100)
    query_reason = models.TextField()
    other_information = models.TextField()
    date_of_query = models.DateField()
    payslip_issue_date = models.DateField()
    employee_id_number = models.CharField(max_length=20)
    contact_number = models.CharField(max_length=15)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Open')

    def clean(self):
        if self.date_of_query > self.payslip_issue_date:
            raise ValidationError('Date of query should not be after payslip issue date.')

    def __str__(self):
        return f'{self.query_type} - {self.employee_name}'
