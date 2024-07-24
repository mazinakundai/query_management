from rest_framework import serializers
from .models import Query


class QuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Query
        fields = '__all__'

    def validate(self, data):
        if data['date_of_query'] > data['payslip_issue_date']:
            raise serializers.ValidationError('Date of query should not be after payslip issue date.')
        return data
