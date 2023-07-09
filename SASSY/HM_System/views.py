from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User
import jwt
import sys
import datetime
from django.db import connection

# Create your views here.


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        user_type = request.data['user_type']
        user = User.objects.filter(
            username=username, user_type=user_type).first()
        if user is None:
            raise AuthenticationFailed('User Not Found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect Password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')
        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)

        response.data = {
            'jwt': token
        }

        return response


class isAuth(APIView):
    def get(sef, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response({
            'response': serializer.data
        })


class UserView(APIView):
    def authenticate(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        return payload

    def cursorToDict(self, cursor):
        columns = [col[0] for col in cursor.description]
        return [
            dict(zip(columns, row))
            for row in cursor.fetchall()
        ]


class DoctorView(UserView):
    def get(self, request):
        payload = UserView.authenticate(self, request)
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response({
            'response': serializer.data
        })


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'detail': 'Logout Successful'
        }
        return response


class CreateUserView(UserView):
    def post(self, request):
        UserView.authenticate(self, request)

        username = request.data['username']
        password = request.data['password']
        user_type = request.data['user_type']
        hashed_pwd = make_password(password=password)

        # Run query to insert into Users table
        query = """INSERT INTO hm_system_user (username, password, user_type, is_superuser) VALUES (%s,%s,%s,%s);"""
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (username, hashed_pwd, user_type, '0'))
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Username not available.'
            }
            return response

        print("Query1 done")

        query = """Select id from hm_system_user where username=%s"""

        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (username,))
                record = cursor.fetchone()
                eid = record[0]
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Could not add user.'
            }
            return response

        print("Query2 done")

        # GET other info from request
        print(request.data)
        EmployeeId = eid
        Name = request.data['name']
        Address = request.data['address']
        Phone = request.data['phone']
        Email = request.data['email']
        AadharId = request.data['aadhar_id']
        Gender = request.data['gender']
        DOB = request.data['dob']

        # Insert other details of user in appropriate table according to the user type
        if user_type == "1":
            query = """Insert into hm_system_fdoperator values(%s,%s,%s,%s,%s,%s,%s,%s);"""
        elif user_type == "2":
            query = """Insert into hm_system_dataoperator values(%s,%s,%s,%s,%s,%s,%s,%s);"""
        elif user_type == "3":
            query = """Insert into hm_system_doctor values(%s,%s,%s,%s,%s,%s,%s,%s);"""
        else:
            query = """Insert into hm_system_administrator values(%s,%s,%s,%s,%s,%s,%s,%s);"""

        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (EmployeeId, Name, Address,
                               Phone, Email, AadharId, Gender, DOB))
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response
            response.data = {
                'detail': 'Could not add user'
            }
            return response

        print("Query3 done")

        response = Response()
        response.data = {
            'detail': 'User Added Successfully'
        }
        return response


###################################### SQL VIEWS ##################################
######################################## TODO #####################################

class PatientStayView(UserView):
    def get(self, request):
        UserView.authenticate(self, request)
        # Put the required query to get list of patients who are currently staying in the hospital room
        query = "Select * from hm_system_user"
        with connection.cursor() as cursor:
            cursor.execute(query)
            return Response({
                'List': UserView.cursorToDict(self, cursor)
            })

# Query 1


class InsertPatientView(UserView):
    def post(self, request):
        UserView.authenticate(self, request)

        AadharId = request.data['AadharID']
        Name = request.data['Name']
        Address = request.data['Address']
        Phone = request.data['Phone']
        Email = request.data['Email']
        Gender = request.data['Gender']
        if Gender == 'Male':
            Gender = 1
        elif Gender == 'Female':
            Gender = 2
        else:
            Gender = 3
        DOB = request.data['DOB']

        query = """Insert into hm_system_patient values(%s,%s,%s,%s,%s,%s,%s);"""
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (AadharId, Name, Address,
                               Phone, Email, Gender, DOB))
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response
            response.data = {
                'detail': 'Could not add patient'
            }
            return response

        response = Response()
        response.data = {
            'detail': 'Patient Added Successfully'
        }
        return response

# Query 3


class ConfirmAppointmentView(UserView):
    def post(self, request):
        UserView.authenticate(self, request)

        Patient = request.data['PatientID']
        Doctor = request.data['DoctorID']
        Start = request.data['DateOfAppointment']

        today = datetime.datetime.now().date()
        date_time_obj = datetime.datetime.strptime(Start, '%Y-%m-%d').date()
        if today > date_time_obj:
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Appointment cannot be scheduled for past dates'
            }
            return response

        query = """Select count(distinct A.AppointmentID)
                    from hm_system_appointment as A
                    where A.Doctor_id=%s and CAST(A.Start as DATE)=%s"""
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (Doctor, Start))
                row = cursor.fetchone()
                if int(row[0]) >= 10:
                    response = Response()
                    response.status_code = 405
                    response.data = {
                        'detail': 'Number of appointments for doctor exceeded on that date'
                    }
                    return response
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Failed to get doctor appointments'
            }
            return response

        query = """Insert into hm_system_appointment (Patient_id,Doctor_id,Start) values(%s,%s,%s);"""
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (Patient, Doctor, Start))

        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Could not add appointment'
            }
            return response
        response = Response()
        response.data = {
            'detail': f'Appointment Added Successfully '
        }
        return response

# Query 4


class InsertPrescribeView(UserView):
    def post(self, request):
        UserView.authenticate(self, request)

        Appointment = request.data['appointmentid']
        MedList=request.data['MedicineList']
        if not MedList:
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Medicine list is empty'
            }
            return response
        for medicine in MedList:
            query = """Insert into hm_system_prescribes (Dose,Appointment_id,Medication_id) values (%s,%s,%s);"""
            try:
                with connection.cursor() as cursor:
                    cursor.execute(query, ("null",int(Appointment),int(medicine)))
            except Exception as e:
                print(e)
                response = Response()
                response.status_code = 405
                response.data = {
                    'detail': 'Could not add medicines'
                }
                return response
        response = Response()
        response.data = {
            'detail': 'Medicines Added Successfully'
        }
        return response


class InsertReportView(UserView):
    def post(self, request):
        UserView.authenticate(self, request)

        Appointment = request.data['appointmentid']
        TestList=request.data['Test']
        if not TestList:
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Test list is empty'
            }
            return response
        now = datetime.datetime.now()
        Start = now.strftime('%Y-%m-%d %H:%M:%S')
        query = """Insert into hm_system_report (Appointment_id,Test_id,TestResult,Date) values (%s,%s,%s,%s);"""
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (Appointment,TestList[0],TestList[1],Start))
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Could not add Test'
            }
            return response
        response = Response()
        response.data = {
            'detail': 'Test Added Successfully'
        }
        return response

# Query 8


class InsertStayView(UserView):
    def post(self, request):
        UserView.authenticate(self, request)

        Patient = request.data['PatientID']

        # check if room is available
        query = """Select Number from hm_system_room where Unavailable=0;"""
        try:
            with connection.cursor() as cursor:
                cursor.execute(query)
                row = cursor.fetchone()
                Room = row[0]
                now = datetime.datetime.now()
                Start = now.strftime('%Y-%m-%d %H:%M:%S')
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response
            response.data = {
                'detail': 'Room not available'
            }
            return response

        # check if patient is not currently admitted
        query = """SELECT * from hm_system_stay WHERE Patient_id=%s and End is NULL;"""
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (Patient,))
                row = cursor.fetchone()
                if row is not None:
                    response = Response()
                    response.status_code = 405
                    response
                    response.data = {
                        'detail': 'Patient is already admitted'
                    }
                    return response

        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response
            response.data = {
                'detail': 'Unable to check if user is currently admitted'
            }
            return response

        query = """Insert into hm_system_stay (Patient_id,Room_id,Start,End) values(%s,%s,%s,NULL);"""
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (Patient, Room, Start))
                query = """update hm_system_room set Unavailable=1 where Number=%s;"""
                cursor.execute(query, (Room,))
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response
            response.data = {
                'detail': 'Patient not admitted'
            }
            return response
        response = Response()
        response.data = {
            'detail': 'Patient Admitted Successfully'
        }
        return response

class InsertUndergoesView(UserView):
    def post(self, request):
            UserView.authenticate(self, request)

            Appointment = request.data['appointmentid']
            Treatment=request.data['Treatment']
            if not Treatment:
                response = Response()
                response.status_code = 405
                response.data = {
                    'detail': 'Treatment list is empty'
                }
                return response
            now = datetime.datetime.now()
            Start = now.strftime('%Y-%m-%d %H:%M:%S')
            query = """Insert into hm_system_undergoes (Date,Appointment_id,Treatment_id) values (%s,%s,%s);"""
            try:
                with connection.cursor() as cursor:
                    cursor.execute(query, (Start,Appointment,Treatment[0]))
            except Exception as e:
                print(e)
                response = Response()
                response.status_code = 405
                response.data = {
                    'detail': 'Could not add treatment'
                }
                return response
            response = Response()
            response.data = {
                'detail': 'Treatment Added Successfully'
            }
            return response

# Query 5


class GetPatientsView(UserView):
    def get(self, request):
        payload = UserView.authenticate(self, request)
        id = payload['id']
        query = """Select * from hm_system_patient where AadharId in (Select Patient_id from hm_system_appointment where Doctor_id = %s) """
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (str(id),))
                return Response({
                    'List': UserView.cursorToDict(self, cursor)
                })
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Could not retrive data'
            }

# Query 6 ????????

# Query 7


class GetRoomsView(UserView):
    def get(self, request):
        UserView.authenticate(self, request)
        query = """Select *
                from hm_system_room as R
                where R.Unavailable=0;"""
        try:
            with connection.cursor() as cursor:
                cursor.execute(query)
                return Response({
                    'List': UserView.cursorToDict(self, cursor)
                })
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response
            response.data = {
                'detail': 'Unable to get rooms data'
            }
            return response

# Query 9???

# Query 10


class GetReportsView(UserView):
    def get(self, request):
        UserView.authenticate(self, request)
        query = """Select *
                from hm_system_report
                where Patient=111 and Doctor=1
                order by Date DESC limit 5;"""
        try:
            with connection.cursor() as cursor:
                cursor.execute(query)
                return Response({
                    'List': UserView.cursorToDict(self, cursor)
                })
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response
            response.data = {
                'detail': 'Unable to get reports'
            }
            return response

# Query 13


class GetAdmittedView(UserView):
    def get(self, request):
        UserView.authenticate(self, request)
        query = """Select P.AadharId as id, P.Name as name, S.StayID as stayID, P.Gender as gender
                from hm_system_patient as P, hm_system_stay as S
                where S.Patient_id=P.AadharId and S.End is NULL;"""
        try:
            with connection.cursor() as cursor:
                cursor.execute(query)
                return Response({
                    'List': UserView.cursorToDict(self, cursor)
                })
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response
            response.data = {
                'detail': 'Unable to get patients'
            }
            return response

# Query 14 ????

# Query 15


class DischargePatientView(UserView):
    def post(self, request):
        UserView.authenticate(self, request)
        StayID = request.data['stayid']
        now = datetime.datetime.now()
        End = now.strftime('%Y-%m-%d %H:%M:%S')
        query = """Update hm_system_stay set End=%s where StayID=%s and End is NULL;"""
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (End, StayID))
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response
            response.data = {
                'detail': 'Unable to find patient in database'
            }
            return response

        query = """Update hm_system_room
                Set Unavailable=0
                where Number=(Select S.Room_id
                            from hm_system_stay as S
                            where S.StayID=%s);"""
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (StayID,))
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Unable to find room availability'
            }
            return response
        return Response({
            'detail': 'Discharged successfully'
        })


class GetUserProfile(UserView):
    def post(self, request):
        UserView.authenticate(self, request)
        user_type = request.data['user_type']
        print(user_type)
        query = ""
        if user_type == 1:
            query = """ Select * from hm_system_user inner join hm_system_fdoperator on hm_system_user.id = hm_system_fdoperator.EmployeeId_id; """
        elif user_type == 2:
            query = """ Select * from hm_system_user inner join hm_system_dataoperator on hm_system_user.id = hm_system_dataoperator.EmployeeId_id; """
        elif user_type == 3:
            query = """ Select * from hm_system_user inner join hm_system_doctor on hm_system_user.id = hm_system_doctor.EmployeeId_id; """
        elif user_type == 4:
            query = """ Select * from hm_system_user inner join hm_system_administrator on hm_system_user.id = hm_system_administrator.EmployeeId_id; """

        try:
            with connection.cursor() as cursor:
                cursor.execute(query)
                return Response({
                    'List': UserView.cursorToDict(self, cursor)
                })
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Could not retrive data'
            }
            return response


class DeleteUserView(UserView):
    def post(self, request):
        payload = UserView.authenticate(self, request)
        user_type = request.data['user_type']
        id = request.data['EmployeeId_id']
        query = ""
        if user_type == 1:
            query = """DELETE FROM hm_system_fdoperator WHERE EmployeeId_id = %s;"""
        elif user_type == 2:
            query = """DELETE FROM hm_system_dataoperator WHERE EmployeeId_id = %s;"""
        elif user_type == 3:
            query = """DELETE FROM hm_system_doctor WHERE EmployeeId_id = %s;"""
        elif user_type == 4:
            query = """DELETE FROM hm_system_administrator WHERE EmployeeId_id = %s;"""

        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (str(id),))
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Could not delete user'
            }
            return response

        query = """DELETE FROM hm_system_user WHERE id = %s;"""
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (str(id),))
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Could not delete user'
            }
            return response

        if payload['id'] == id:
            response = Response()
            response.delete_cookie('jwt')
            response.data = {
                'detail': 'Logout Successful'
            }
            return response

        response = Response()
        response.data = {
            'detail': 'User Deleted Successfully'
        }
        return response


class UpcomingAppointments(UserView):
    def get(self, request):
        payload = UserView.authenticate(self, request)
        id = payload['id']
        today = datetime.datetime.now().date()
        query = """Select * from hm_system_patient where AadharId in (Select Patient_id from hm_system_appointment where Doctor_id = %s and CAST(start as Date)>= %s) """
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (str(id), today.strftime('%Y-%m-%d')))
                return Response({
                    'List': UserView.cursorToDict(self, cursor)
                })
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Could not retrive data'
            }


class getProfileView(UserView):
    def get(self, request):
        payload = UserView.authenticate(self, request)
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        print(serializer.data)
        user_type = serializer.data['user_type']

        query = ""
        if user_type == 1:
            query = """SELECT * FROM hm_system_fdoperator WHERE EmployeeId_id = %s;"""
        elif user_type == 2:
            query = """SELECT * FROM hm_system_dataoperator WHERE EmployeeId_id = %s;"""
        elif user_type == 3:
            query = """SELECT * FROM hm_system_doctor WHERE EmployeeId_id = %s;"""
        elif user_type == 4:
            query = """SELECT * FROM hm_system_administrator WHERE EmployeeId_id = %s;"""

        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (str(payload['id'])))
                return Response(UserView.cursorToDict(self, cursor))
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Could not retrive data'
            }
            return response


class GetPatientDetails(UserView):
    def post(self, request):
        UserView.authenticate(self, request)
        id = request.data['id']
        query = """Select * from hm_system_patient where  AadharId = %s"""
        profile = None
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (str(id),))
                profile =  UserView.cursorToDict(self, cursor)
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Could not retrive data'
            }
            return response
        query="""select A.AppointmentID,A.Doctor_id,T.TreatmentID,T.Name,U.Date from hm_system_undergoes as U,hm_system_appointment as A,hm_system_treatment as T where
                U.Appointment_id=A.AppointmentID and U.Treatment_id=T.TreatmentID and A.Patient_id=%s"""
        undergoes = None
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (str(id),))
                undergoes =  UserView.cursorToDict(self, cursor)
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Could not retrive data'
            }
            return response
        
        query="""select A.AppointmentID,A.Doctor_id,M.Code,M.Name,A.Start from hm_system_prescribes as P,hm_system_appointment as A,hm_system_Medication as M where
                P.Appointment_id=A.AppointmentID and P.Medication_id=M.Code and A.Patient_id=%s"""
        prescribes = None
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (str(id),))
                prescribes =  UserView.cursorToDict(self, cursor)
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response
            response.data = {
                'detail': 'Could not retrive data'
            }
            return response
            
        
        query="""select * from hm_system_report as U,hm_system_appointment as A,hm_system_test as T where
                U.Appointment_id=A.AppointmentID and U.Test_id=T.Code and A.Patient_id=%s"""
        report = None
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (str(id),))
                report =  UserView.cursorToDict(self, cursor)
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Could not retrive data'
            }
            return response
        
        return Response({
            'Profile': profile,
            'Treatment': undergoes,
            'Medication': prescribes ,
            'Test': report
        })


class GetPatientAppointment(UserView):
    def get(self, request):
        UserView.authenticate(self, request)
        now = datetime.datetime.now()
        today = now.strftime('%Y-%m-%d')
        query = """Select P.AadharId as Patient_id, P.Name, A.AppointmentID,CAST(A.Start as Date) as Start
                from hm_system_patient as P, hm_system_appointment as A
                where A.Patient_id=P.AadharId and CAST(A.Start as Date)<= %s;"""
        try:
            with connection.cursor() as cursor:
                cursor.execute(query,(today,))
                return Response({
                    'List': UserView.cursorToDict(self, cursor)
                })
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Could not retrive data'
            }

class AvailableDoctorView(UserView):
    def post(self, request):
            UserView.authenticate(self, request)
            Date = request.data['date']

            query = """select EmployeeId_id as id,Name as name 
                    from hm_system_doctor where EmployeeId_id not in 
                    (select Doctor_id from hm_system_appointment as A 
                    where CAST(A.Start as DATE)=%s 
                    group by Doctor_id having count(*)>=10);"""
            try:
                with connection.cursor() as cursor:
                    cursor.execute(query, (Date,))
                    return Response({
                    'List': UserView.cursorToDict(self, cursor)
                    })
            except Exception as e:
                print(e)
                response = Response()
                response.status_code = 405
                response.data = {
                    'detail': 'Could not get doctors'
                }
                return response


class GetMedication(UserView):
    def get(self, request):
        UserView.authenticate(self, request)
        query = """Select Code as medicine_id,Name from hm_system_medication;"""
        try:
            with connection.cursor() as cursor:
                cursor.execute(query)
                return Response({
                    'List': UserView.cursorToDict(self, cursor)
                })
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Could not retrive data'
            }

class GetTest(UserView):
    def get(self, request):
        UserView.authenticate(self, request)
        query = """Select Code as test_id,Name from hm_system_test;"""
        try:
            with connection.cursor() as cursor:
                cursor.execute(query)
                return Response({
                    'List': UserView.cursorToDict(self, cursor)
                })
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Could not retrive data'
            }

class GetTreatment(UserView):
    def get(self, request):
        UserView.authenticate(self, request)
        query = """Select TreatmentID as treatment_id,Name from hm_system_treatment;"""
        try:
            with connection.cursor() as cursor:
                cursor.execute(query)
                return Response({
                    'List': UserView.cursorToDict(self, cursor)
                })
        except Exception as e:
            print(e)
            response = Response()
            response.status_code = 405
            response.data = {
                'detail': 'Could not retrive data'
            }