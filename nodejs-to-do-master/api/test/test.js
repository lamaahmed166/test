process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let User = require('../models/user.model');
let BookingRequest = require('../models/bookingrequest.model');
let Notification = require('../models/notification.model');
let Topic = require('../models/topic.model');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
chai.use(chaiHttp);




describe('/GET book', () => {
  it('it should GET all the requests', (done) => {
    chai.request('http://localhost:3000/api/')
   .get('requests/getRequests')
   .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlN0YXJ0VXBzIjpbXSwiUmF0aW5nIjo1LCJCbG9ja2luZ1N0YXR1cyI6ZmFsc2UsIkV4cGVydCI6ZmFsc2UsIlRvcGljcyI6W10sIlByZXZpb3VzRXhwZXJpbmNlcyI6WyJTb2Z0d2FyZSBlbmdpbmVlciJdLCJNeVNjaGVkdWxlIjpbeyJfaWQiOiI1YWM5Y2MxNGYwZjJlMzM5NGM4OWM2NjMiLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6InNvZnR3YXJlIGVuZ2luZWVyaW5nIiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTEwVDA3OjUzOjM5LjAwMFoiLCJTZWVrZXJFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSJ9LHsiX2lkIjoiNWFjOWNkNDdmMGYyZTMzOTRjODljNjY1IiwiRXhwZXJ0RW1haWwiOiJoYW5hbkBnbWFpbC5jb20iLCJUb3BpY05hbWUiOiJzb2Z0d2FyZSBlbmdpbmVlcmluZyIsIkRhdGVUaW1lIjoiMjAxOC0wNC0wM1QwNjowMzo1Ni4wMDBaIiwiU2Vla2VyRW1haWwiOiJoYW5hbkBnbWFpbC5jb20ifSx7Il9pZCI6IjVhY2E3NGUyMWRjYWZkMGMyNDA3YzQ5OSIsIlNlZWtlckVtYWlsIjoiYWRhbUBnbWFpbC5jb20iLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6ImNzZW4iLCJEYXRlVGltZSI6IjIwMTgtMDctMDdUMjA6MDA6MDMuMDAwWiJ9LHsiX2lkIjoiNWFjYTk1YmIxZGNhZmQwYzI0MDdjNDliIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoic29mdHdhcmUgZW5naW5lZXJpbmciLCJEYXRlVGltZSI6IjIwMTgtMDQtMjFUMjI6MjA6MDEuMDAwWiJ9LHsiX2lkIjoiNWFkMTE1NWFjYTExNWMxZjI0MTA5MDg3IiwiU2Vla2VyRW1haWwiOiJoYW5hbkBnbWFpbC5jb20iLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6InNvZnR3YXJlIGRldmVsb3BtZW50IiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTE0VDIwOjM4OjIwLjAwMFoifV0sIk15SW50ZXJ2aWV3cyI6W3siX2lkIjoiNWFjN2Y3NTEyOTc4NzMxMjU4Yjk3ZThlIiwiRXhwZXJ0RW1haWwiOiJoYW5hbkBnbWFpbC5jb20iLCJUb3BpY05hbWUiOiJjc2VuIiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTAyVDAwOjA0OjA1LjM3OFoiLCJTZWVrZXJFbWFpbCI6ImFkYW1AZ21haWwuY29tIn0seyJfaWQiOiI1YWM5Y2MxNGYwZjJlMzM5NGM4OWM2NjQiLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6InNvZnR3YXJlIGVuZ2luZWVyaW5nIiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTEwVDA3OjUzOjM5LjAwMFoiLCJTZWVrZXJFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSJ9LHsiX2lkIjoiNWFjOWNkNDdmMGYyZTMzOTRjODljNjY2IiwiRXhwZXJ0RW1haWwiOiJoYW5hbkBnbWFpbC5jb20iLCJUb3BpY05hbWUiOiJzb2Z0d2FyZSBlbmdpbmVlcmluZyIsIkRhdGVUaW1lIjoiMjAxOC0wNC0wM1QwNjowMzo1Ni4wMDBaIiwiU2Vla2VyRW1haWwiOiJoYW5hbkBnbWFpbC5jb20ifSx7Il9pZCI6IjVhY2E3NGUyMWRjYWZkMGMyNDA3YzQ5YSIsIlNlZWtlckVtYWlsIjoiYWRhbUBnbWFpbC5jb20iLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6ImNzZW4iLCJEYXRlVGltZSI6IjIwMTgtMDctMDdUMjA6MDA6MDMuMDAwWiJ9LHsiX2lkIjoiNWFjYTk1YmIxZGNhZmQwYzI0MDdjNDljIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoic29mdHdhcmUgZW5naW5lZXJpbmciLCJEYXRlVGltZSI6IjIwMTgtMDQtMjFUMjI6MjA6MDEuMDAwWiJ9LHsiX2lkIjoiNWFjYmEwYjc2MjA5MDEyMTI0YjcyNTFiIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoic29mdHdhcmUgZW5naW5lZXJpbmciLCJEYXRlVGltZSI6IjIwMTgtMDQtMDFUMTc6MTc6MTYuMDAwWiJ9LHsiX2lkIjoiNWFjYmMyNjQ2MjA5MDEyMTI0YjcyNTFkIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoic29mdHdhcmUgZW5naW5lZXJpbmciLCJEYXRlVGltZSI6IjIwMTgtMDQtMTBUMTY6MjA6MDIuMDAwWiJ9LHsiX2lkIjoiNWFjYmQ3MWI2MjA5MDEyMTI0YjcyNTIwIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoibWFya2V0aW5nIiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTEwVDIxOjA4OjQ0LjAwMFoifSx7Il9pZCI6IjVhY2M4OThkYjc4MTU4MzFhY2JiNmY5MyIsIlNlZWtlckVtYWlsIjoiYWRhbUBnbWFpbC5jb20iLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6InNvZnR3YXJlIGVuZ2luZWVyaW5nIiwiRGF0ZVRpbWUiOiIyMDE4LTA1LTA2VDA5OjUxOjUwLjAwMFoifSx7Il9pZCI6IjVhY2NjNjM2NTYyMjViMGJiYzY1MWM0YSIsIlNlZWtlckVtYWlsIjoiYWRhbUBnbWFpbC5jb20iLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6InNvZnR3YXJlIGRldmVsb3BtZW50IiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTAxVDE0OjA5OjU2LjAwMFoifSx7Il9pZCI6IjVhY2NjOTY3NTYyMjViMGJiYzY1MWM0ZiIsIlNlZWtlckVtYWlsIjoic2FyYWhAZ21haWwuY29tIiwiRXhwZXJ0RW1haWwiOiJoYW5hbkBnbWFpbC5jb20iLCJUb3BpY05hbWUiOiJzb2Z0d2FyZSBkZXZlbG9wbWVudCIsIkRhdGVUaW1lIjoiMjAxOC0wNC0xMFQxNDoyMzowNi4wMDBaIn0seyJfaWQiOiI1YWNkMDNjNTU2MjI1YjBiYmM2NTFjNTUiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoibWFya2V0aW5nMiIsIkRhdGVUaW1lIjoiMjAxOC0wNC0xMFQxODozNDowMC4wMDBaIn0seyJfaWQiOiI1YWNkMzhjZjllNTEyOTRjNDhhMWQyZDEiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkMzhmZjllNTEyOTRjNDhhMWQyZDMiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkMzk2YzEwNGVmODU1MWMyMTQwYWMiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkMzllOTViYmIzYjU2M2M5ZjA0YTYiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkM2E0ZDViYmIzYjU2M2M5ZjA0YTgiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkM2E2MDViYmIzYjU2M2M5ZjA0YWEiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkM2E2ZTViYmIzYjU2M2M5ZjA0YWMiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkM2E4OTViYmIzYjU2M2M5ZjA0YWUiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkM2Q3ZDViYmIzYjU2M2M5ZjA0YWYiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkM2Q5MzViYmIzYjU2M2M5ZjA0YjMiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkM2VjNTViYmIzYjU2M2M5ZjA0YjciLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkNDE3MjViYmIzYjU2M2M5ZjA0YmEiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNlNjZiY2RhYmQ2NzUwMjgxZDU5ZGMiLCJTZWVrZXJFbWFpbCI6InNhcmFoaEBnbWFpbC5jb20iLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6InNvZnR3YXJlIGRldmVsb3BtZW50IiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTAyVDE5OjQ4OjI5LjAwMFoifSx7Il9pZCI6IjVhZDExNTVhY2ExMTVjMWYyNDEwOTA4OCIsIlNlZWtlckVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiRXhwZXJ0RW1haWwiOiJoYW5hbkBnbWFpbC5jb20iLCJUb3BpY05hbWUiOiJzb2Z0d2FyZSBkZXZlbG9wbWVudCIsIkRhdGVUaW1lIjoiMjAxOC0wNC0xNFQyMDozODoyMC4wMDBaIn0seyJfaWQiOiI1YWQzMjc5YTE4NDRiMTA2NDA2ODE1MjAiLCJTZWVrZXJFbWFpbCI6ImFkYW1AZ21haWwuY29tIiwiRXhwZXJ0RW1haWwiOiJoYW5hbkBnbWFpbC5jb20iLCJUb3BpY05hbWUiOiJjc2VuIiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTA3VDEwOjIwOjEyLjAwMFoifV0sIkNyZWF0ZWRBdCI6IjIwMTgtMDQtMDZUMjI6Mzk6NTcuMzk0WiIsIl9pZCI6IjVhYzdmNzNkMjk3ODczMTI1OGI5N2U4YyIsIkZpcnN0TmFtZSI6Im1vbWVuIiwiTGFzdE5hbWUiOiJhbWdhZCIsImVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiX192IjozMiwiQWRkaXRpb25hbEluZm8iOiJBbmEgYWdtYWQgRXhwZXJ0IGYgUmlzZVVwIDspIn0sImlhdCI6MTUyMzgyMzAwNywiZXhwIjoxNTIzODY2MjA3fQ.bUgqWzDnk7P-fnmf6Txt-W__FUXGyluJVaMzRl8pAP8')
   .end((err, res) => {
   res.should.have.status(200);
   res.body.data.should.be.a('array');



   
   done();
   });
   });
   });
   /*describe('/Patch threads', () => {
    it('it should update the thread', (done) => {
      chai.request('http://localhost:3000/api/')
     .patch('threads/updateThread/5ace61d7dabd6750281d59d3')
     .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlN0YXJ0VXBzIjpbXSwiUmF0aW5nIjo1LCJCbG9ja2luZ1N0YXR1cyI6ZmFsc2UsIkV4cGVydCI6ZmFsc2UsIlRvcGljcyI6W10sIlByZXZpb3VzRXhwZXJpbmNlcyI6WyJTb2Z0d2FyZSBlbmdpbmVlciJdLCJNeVNjaGVkdWxlIjpbeyJfaWQiOiI1YWM5Y2MxNGYwZjJlMzM5NGM4OWM2NjMiLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6InNvZnR3YXJlIGVuZ2luZWVyaW5nIiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTEwVDA3OjUzOjM5LjAwMFoiLCJTZWVrZXJFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSJ9LHsiX2lkIjoiNWFjOWNkNDdmMGYyZTMzOTRjODljNjY1IiwiRXhwZXJ0RW1haWwiOiJoYW5hbkBnbWFpbC5jb20iLCJUb3BpY05hbWUiOiJzb2Z0d2FyZSBlbmdpbmVlcmluZyIsIkRhdGVUaW1lIjoiMjAxOC0wNC0wM1QwNjowMzo1Ni4wMDBaIiwiU2Vla2VyRW1haWwiOiJoYW5hbkBnbWFpbC5jb20ifSx7Il9pZCI6IjVhY2E3NGUyMWRjYWZkMGMyNDA3YzQ5OSIsIlNlZWtlckVtYWlsIjoiYWRhbUBnbWFpbC5jb20iLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6ImNzZW4iLCJEYXRlVGltZSI6IjIwMTgtMDctMDdUMjA6MDA6MDMuMDAwWiJ9LHsiX2lkIjoiNWFjYTk1YmIxZGNhZmQwYzI0MDdjNDliIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoic29mdHdhcmUgZW5naW5lZXJpbmciLCJEYXRlVGltZSI6IjIwMTgtMDQtMjFUMjI6MjA6MDEuMDAwWiJ9LHsiX2lkIjoiNWFkMTE1NWFjYTExNWMxZjI0MTA5MDg3IiwiU2Vla2VyRW1haWwiOiJoYW5hbkBnbWFpbC5jb20iLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6InNvZnR3YXJlIGRldmVsb3BtZW50IiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTE0VDIwOjM4OjIwLjAwMFoifV0sIk15SW50ZXJ2aWV3cyI6W3siX2lkIjoiNWFjN2Y3NTEyOTc4NzMxMjU4Yjk3ZThlIiwiRXhwZXJ0RW1haWwiOiJoYW5hbkBnbWFpbC5jb20iLCJUb3BpY05hbWUiOiJjc2VuIiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTAyVDAwOjA0OjA1LjM3OFoiLCJTZWVrZXJFbWFpbCI6ImFkYW1AZ21haWwuY29tIn0seyJfaWQiOiI1YWM5Y2MxNGYwZjJlMzM5NGM4OWM2NjQiLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6InNvZnR3YXJlIGVuZ2luZWVyaW5nIiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTEwVDA3OjUzOjM5LjAwMFoiLCJTZWVrZXJFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSJ9LHsiX2lkIjoiNWFjOWNkNDdmMGYyZTMzOTRjODljNjY2IiwiRXhwZXJ0RW1haWwiOiJoYW5hbkBnbWFpbC5jb20iLCJUb3BpY05hbWUiOiJzb2Z0d2FyZSBlbmdpbmVlcmluZyIsIkRhdGVUaW1lIjoiMjAxOC0wNC0wM1QwNjowMzo1Ni4wMDBaIiwiU2Vla2VyRW1haWwiOiJoYW5hbkBnbWFpbC5jb20ifSx7Il9pZCI6IjVhY2E3NGUyMWRjYWZkMGMyNDA3YzQ5YSIsIlNlZWtlckVtYWlsIjoiYWRhbUBnbWFpbC5jb20iLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6ImNzZW4iLCJEYXRlVGltZSI6IjIwMTgtMDctMDdUMjA6MDA6MDMuMDAwWiJ9LHsiX2lkIjoiNWFjYTk1YmIxZGNhZmQwYzI0MDdjNDljIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoic29mdHdhcmUgZW5naW5lZXJpbmciLCJEYXRlVGltZSI6IjIwMTgtMDQtMjFUMjI6MjA6MDEuMDAwWiJ9LHsiX2lkIjoiNWFjYmEwYjc2MjA5MDEyMTI0YjcyNTFiIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoic29mdHdhcmUgZW5naW5lZXJpbmciLCJEYXRlVGltZSI6IjIwMTgtMDQtMDFUMTc6MTc6MTYuMDAwWiJ9LHsiX2lkIjoiNWFjYmMyNjQ2MjA5MDEyMTI0YjcyNTFkIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoic29mdHdhcmUgZW5naW5lZXJpbmciLCJEYXRlVGltZSI6IjIwMTgtMDQtMTBUMTY6MjA6MDIuMDAwWiJ9LHsiX2lkIjoiNWFjYmQ3MWI2MjA5MDEyMTI0YjcyNTIwIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoibWFya2V0aW5nIiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTEwVDIxOjA4OjQ0LjAwMFoifSx7Il9pZCI6IjVhY2M4OThkYjc4MTU4MzFhY2JiNmY5MyIsIlNlZWtlckVtYWlsIjoiYWRhbUBnbWFpbC5jb20iLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6InNvZnR3YXJlIGVuZ2luZWVyaW5nIiwiRGF0ZVRpbWUiOiIyMDE4LTA1LTA2VDA5OjUxOjUwLjAwMFoifSx7Il9pZCI6IjVhY2NjNjM2NTYyMjViMGJiYzY1MWM0YSIsIlNlZWtlckVtYWlsIjoiYWRhbUBnbWFpbC5jb20iLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6InNvZnR3YXJlIGRldmVsb3BtZW50IiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTAxVDE0OjA5OjU2LjAwMFoifSx7Il9pZCI6IjVhY2NjOTY3NTYyMjViMGJiYzY1MWM0ZiIsIlNlZWtlckVtYWlsIjoic2FyYWhAZ21haWwuY29tIiwiRXhwZXJ0RW1haWwiOiJoYW5hbkBnbWFpbC5jb20iLCJUb3BpY05hbWUiOiJzb2Z0d2FyZSBkZXZlbG9wbWVudCIsIkRhdGVUaW1lIjoiMjAxOC0wNC0xMFQxNDoyMzowNi4wMDBaIn0seyJfaWQiOiI1YWNkMDNjNTU2MjI1YjBiYmM2NTFjNTUiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoibWFya2V0aW5nMiIsIkRhdGVUaW1lIjoiMjAxOC0wNC0xMFQxODozNDowMC4wMDBaIn0seyJfaWQiOiI1YWNkMzhjZjllNTEyOTRjNDhhMWQyZDEiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkMzhmZjllNTEyOTRjNDhhMWQyZDMiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkMzk2YzEwNGVmODU1MWMyMTQwYWMiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkMzllOTViYmIzYjU2M2M5ZjA0YTYiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkM2E0ZDViYmIzYjU2M2M5ZjA0YTgiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkM2E2MDViYmIzYjU2M2M5ZjA0YWEiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkM2E2ZTViYmIzYjU2M2M5ZjA0YWMiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkM2E4OTViYmIzYjU2M2M5ZjA0YWUiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkM2Q3ZDViYmIzYjU2M2M5ZjA0YWYiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkM2Q5MzViYmIzYjU2M2M5ZjA0YjMiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkM2VjNTViYmIzYjU2M2M5ZjA0YjciLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNkNDE3MjViYmIzYjU2M2M5ZjA0YmEiLCJTZWVrZXJFbWFpbCI6InNhcmFoQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbjQwMSIsIkRhdGVUaW1lIjoiMjAxNy0wNC0wMlQwMDowNDowNS4zNzhaIn0seyJfaWQiOiI1YWNlNjZiY2RhYmQ2NzUwMjgxZDU5ZGMiLCJTZWVrZXJFbWFpbCI6InNhcmFoaEBnbWFpbC5jb20iLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6InNvZnR3YXJlIGRldmVsb3BtZW50IiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTAyVDE5OjQ4OjI5LjAwMFoifSx7Il9pZCI6IjVhZDExNTVhY2ExMTVjMWYyNDEwOTA4OCIsIlNlZWtlckVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiRXhwZXJ0RW1haWwiOiJoYW5hbkBnbWFpbC5jb20iLCJUb3BpY05hbWUiOiJzb2Z0d2FyZSBkZXZlbG9wbWVudCIsIkRhdGVUaW1lIjoiMjAxOC0wNC0xNFQyMDozODoyMC4wMDBaIn0seyJfaWQiOiI1YWQzMjc5YTE4NDRiMTA2NDA2ODE1MjAiLCJTZWVrZXJFbWFpbCI6ImFkYW1AZ21haWwuY29tIiwiRXhwZXJ0RW1haWwiOiJoYW5hbkBnbWFpbC5jb20iLCJUb3BpY05hbWUiOiJjc2VuIiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTA3VDEwOjIwOjEyLjAwMFoifV0sIkNyZWF0ZWRBdCI6IjIwMTgtMDQtMDZUMjI6Mzk6NTcuMzk0WiIsIl9pZCI6IjVhYzdmNzNkMjk3ODczMTI1OGI5N2U4YyIsIkZpcnN0TmFtZSI6Im1vbWVuIiwiTGFzdE5hbWUiOiJhbWdhZCIsImVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiX192IjozMiwiQWRkaXRpb25hbEluZm8iOiJBbmEgYWdtYWQgRXhwZXJ0IGYgUmlzZVVwIDspIn0sImlhdCI6MTUyMzgyMzAwNywiZXhwIjoxNTIzODY2MjA3fQ.bUgqWzDnk7P-fnmf6Txt-W__FUXGyluJVaMzRl8pAP8')
     .end((err, res) => {
     res.should.have.status(200);
     done();
     });
     });
     });*/
  /*describe('/GET book', () => {
    it('it should GET the User', (done) => {
      chai.request('http://localhost:3000/api/')
     .get('requests/getUser')
     .set('Authorization',
     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlN0YXJ0VXBzIjpbXSwiUmF0aW5nIjo1LCJCbG9ja2luZ1N0YXR1cyI6ZmFsc2UsIkV4cGVydCI6ZmFsc2UsIlRvcGljcyI6W10sIlByZXZpb3VzRXhwZXJpbmNlcyI6W10sIk15U2NoZWR1bGUiOlt7Il9pZCI6IjVhYzdmNWE4ODNkMjY5MmFiODM0OTNmNiIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbiIsIkRhdGVUaW1lIjoiMjAxOC0wNC0wMlQwMDowNDowNS4zNzhaIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSJ9LHsiX2lkIjoiNWFjN2Y2ZGQ1ZTI1NWMxZjQ0MWVhODNhIiwiRXhwZXJ0RW1haWwiOiJoYW5hbkBnbWFpbC5jb20iLCJUb3BpY05hbWUiOiJjc2VuIiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTAyVDAwOjA0OjA1LjM3OFoiLCJTZWVrZXJFbWFpbCI6ImFkYW1AZ21haWwuY29tIn0seyJfaWQiOiI1YWM3Zjc1MTI5Nzg3MzEyNThiOTdlOGQiLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6ImNzZW4iLCJEYXRlVGltZSI6IjIwMTgtMDQtMDJUMDA6MDQ6MDUuMzc4WiIsIlNlZWtlckVtYWlsIjoiYWRhbUBnbWFpbC5jb20ifSx7Il9pZCI6IjVhYzkyYmQ3OWY2Nzk3MjcxODRhNDhhYSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbiIsIkRhdGVUaW1lIjoiMjAxNi0wNC0wMlQwMDowNDowNS4zNzhaIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSJ9LHsiX2lkIjoiNWFjYmEwYjc2MjA5MDEyMTI0YjcyNTFhIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoic29mdHdhcmUgZW5naW5lZXJpbmciLCJEYXRlVGltZSI6IjIwMTgtMDQtMDFUMTc6MTc6MTYuMDAwWiJ9LHsiX2lkIjoiNWFjYmMyNjQ2MjA5MDEyMTI0YjcyNTFjIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoic29mdHdhcmUgZW5naW5lZXJpbmciLCJEYXRlVGltZSI6IjIwMTgtMDQtMTBUMTY6MjA6MDIuMDAwWiJ9LHsiX2lkIjoiNWFjYmQ3MWI2MjA5MDEyMTI0YjcyNTFmIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoibWFya2V0aW5nIiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTEwVDIxOjA4OjQ0LjAwMFoifSx7Il9pZCI6IjVhY2NjNjM1NTYyMjViMGJiYzY1MWM0OSIsIlNlZWtlckVtYWlsIjoiYWRhbUBnbWFpbC5jb20iLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6InNvZnR3YXJlIGRldmVsb3BtZW50IiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTAxVDE0OjA5OjU2LjAwMFoifSx7Il9pZCI6IjVhZDMyNzlhMTg0NGIxMDY0MDY4MTUxZiIsIlNlZWtlckVtYWlsIjoiYWRhbUBnbWFpbC5jb20iLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6ImNzZW4iLCJEYXRlVGltZSI6IjIwMTgtMDQtMDdUMTA6MjA6MTIuMDAwWiJ9LHsiX2lkIjoiNWFkMzQyZDY1Njc2MWQ0OGI4YTY2ZGZiIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoic29zb0BnbWFpbC5jb20iLCJUb3BpY05hbWUiOiJjc2VuIiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTE2VDEyOjE2OjU0LjAwMFoifV0sIk15SW50ZXJ2aWV3cyI6W10sIkNyZWF0ZWRBdCI6IjIwMTgtMDQtMDZUMjI6MzE6MDUuMDA5WiIsIl9pZCI6IjVhYzdmNTI4ODNkMjY5MmFiODM0OTNmNCIsIkZpcnN0TmFtZSI6Im1vbWVuIiwiTGFzdE5hbWUiOiJhbWdhZCIsImVtYWlsIjoiYWRhbUBnbWFpbC5jb20iLCJfX3YiOjE0fSwiaWF0IjoxNTIzODIyMDI1LCJleHAiOjE1MjM4NjUyMjV9.qilMBUC3uxP7MF5HdAM2AqZlmk-V-5eNebkaSkYxGzw').end((err, res) => {
     res.should.have.status(200);
     res.body.data.should.be.a('User');

     
     done();
     });
     });
     });*/
     /*describe('/PATCH book', () => {
        it('it should UPDATE the User', (done) => {
          chai.request('http://localhost:3000/api/')
         .patch('requests/updateUser')
         .set('Authorization',
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlN0YXJ0VXBzIjpbXSwiUmF0aW5nIjo1LCJCbG9ja2luZ1N0YXR1cyI6ZmFsc2UsIkV4cGVydCI6ZmFsc2UsIlRvcGljcyI6W10sIlByZXZpb3VzRXhwZXJpbmNlcyI6W10sIk15U2NoZWR1bGUiOlt7Il9pZCI6IjVhYzdmNWE4ODNkMjY5MmFiODM0OTNmNiIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbiIsIkRhdGVUaW1lIjoiMjAxOC0wNC0wMlQwMDowNDowNS4zNzhaIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSJ9LHsiX2lkIjoiNWFjN2Y2ZGQ1ZTI1NWMxZjQ0MWVhODNhIiwiRXhwZXJ0RW1haWwiOiJoYW5hbkBnbWFpbC5jb20iLCJUb3BpY05hbWUiOiJjc2VuIiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTAyVDAwOjA0OjA1LjM3OFoiLCJTZWVrZXJFbWFpbCI6ImFkYW1AZ21haWwuY29tIn0seyJfaWQiOiI1YWM3Zjc1MTI5Nzg3MzEyNThiOTdlOGQiLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6ImNzZW4iLCJEYXRlVGltZSI6IjIwMTgtMDQtMDJUMDA6MDQ6MDUuMzc4WiIsIlNlZWtlckVtYWlsIjoiYWRhbUBnbWFpbC5jb20ifSx7Il9pZCI6IjVhYzkyYmQ3OWY2Nzk3MjcxODRhNDhhYSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbiIsIkRhdGVUaW1lIjoiMjAxNi0wNC0wMlQwMDowNDowNS4zNzhaIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSJ9LHsiX2lkIjoiNWFjYmEwYjc2MjA5MDEyMTI0YjcyNTFhIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoic29mdHdhcmUgZW5naW5lZXJpbmciLCJEYXRlVGltZSI6IjIwMTgtMDQtMDFUMTc6MTc6MTYuMDAwWiJ9LHsiX2lkIjoiNWFjYmMyNjQ2MjA5MDEyMTI0YjcyNTFjIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoic29mdHdhcmUgZW5naW5lZXJpbmciLCJEYXRlVGltZSI6IjIwMTgtMDQtMTBUMTY6MjA6MDIuMDAwWiJ9LHsiX2lkIjoiNWFjYmQ3MWI2MjA5MDEyMTI0YjcyNTFmIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoibWFya2V0aW5nIiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTEwVDIxOjA4OjQ0LjAwMFoifSx7Il9pZCI6IjVhY2NjNjM1NTYyMjViMGJiYzY1MWM0OSIsIlNlZWtlckVtYWlsIjoiYWRhbUBnbWFpbC5jb20iLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6InNvZnR3YXJlIGRldmVsb3BtZW50IiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTAxVDE0OjA5OjU2LjAwMFoifSx7Il9pZCI6IjVhZDMyNzlhMTg0NGIxMDY0MDY4MTUxZiIsIlNlZWtlckVtYWlsIjoiYWRhbUBnbWFpbC5jb20iLCJFeHBlcnRFbWFpbCI6ImhhbmFuQGdtYWlsLmNvbSIsIlRvcGljTmFtZSI6ImNzZW4iLCJEYXRlVGltZSI6IjIwMTgtMDQtMDdUMTA6MjA6MTIuMDAwWiJ9LHsiX2lkIjoiNWFkMzQyZDY1Njc2MWQ0OGI4YTY2ZGZiIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoic29zb0BnbWFpbC5jb20iLCJUb3BpY05hbWUiOiJjc2VuIiwiRGF0ZVRpbWUiOiIyMDE4LTA0LTE2VDEyOjE2OjU0LjAwMFoifV0sIk15SW50ZXJ2aWV3cyI6W10sIkNyZWF0ZWRBdCI6IjIwMTgtMDQtMDZUMjI6MzE6MDUuMDA5WiIsIl9pZCI6IjVhYzdmNTI4ODNkMjY5MmFiODM0OTNmNCIsIkZpcnN0TmFtZSI6Im1vbWVuIiwiTGFzdE5hbWUiOiJhbWdhZCIsImVtYWlsIjoiYWRhbUBnbWFpbC5jb20iLCJfX3YiOjE0fSwiaWF0IjoxNTIzODIyMDI1LCJleHAiOjE1MjM4NjUyMjV9.qilMBUC3uxP7MF5HdAM2AqZlmk-V-5eNebkaSkYxGzw')         .end((err, res) => {
         res.should.have.status(200);
         res.body.data.should.be.a('User');
    
         
      
    
         
         done();
         });
         });

         });*/

var URI = 'http://localhost:3000/api/';
var loginPath = '/auth/login';

describe('/Post Log in tests', () => {

  it(
    'Fail log in email format not valid 422',
    function (done) {
      var that = this;
      chai.request(URI).post(loginPath).send({
        email: "hamahmiyahoocom",
        password: "123456789",
      }).
        end(function (err, res) {
          if (err) {
            done(err);
          } else {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('msg').
              eql('Email(examble@domain.com) and Password(String) are required fields!');
            done();
          }
        });
    }
  );

  it(
    'Fail log in user not found 404',
    function (done) {
      var that = this;
      chai.request(URI).post(loginPath).send({
        email: "maryam@yahoo.com",
        password: "123456789",
      }).
        end(function (err, res) {
          if (err) {
            done(err);
          } else {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('msg').eql('User not found.');
            done();
          }
        });
    }
  );

  it(
    'Fail log in wrong pass 401',
    function (done) {
      var that = this;
      chai.request(URI).post(loginPath).send({
        email: "hamahmi@yahoo.com",
        password: "1234567jhkf",
      }).
        end(function (err, res) {
          if (err) {
            done(err);
          } else {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('msg').eql('Password is incorrect.');
            done();
          }
        });
    }
  );

  it(
    'User Login successfully 200',
    function (done) {
      var that = this;
      chai.request(URI).post(loginPath).send({
        email: "hamahmi@yahoo.com",
        password: "123456789",
      }).
        end(function (err, res) {
          if (err) {
            done(err);
          } else {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.should.have.property('msg').eql('Welcome');
            done();
          }
        });
    }
  );
});


describe('/GET Threads', () => {
  it('it should GET all the Threads', (done) => {
    chai.request('http://localhost:3000/api/')
   .get('threads/getMyThreads')
   .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlN0YXJ0VXBzIjpbXSwiUmF0aW5nIjo1LCJCbG9ja2luZ1N0YXR1cyI6ZmFsc2UsIkV4cGVydCI6ZmFsc2UsIlRvcGljcyI6W10sIlByZXZpb3VzRXhwZXJpbmNlcyI6W10sIk15U2NoZWR1bGUiOltdLCJNeUludGVydmlld3MiOltdLCJDcmVhdGVkQXQiOiIyMDE4LTA0LTE2VDIxOjAzOjQxLjUzOVoiLCJfaWQiOiI1YWQ1MGZhZDFlNjA2OTNhNTAwMmRhMjgiLCJlbWFpbCI6ImFobWVlZWRAZ21haWwuY29tIiwiRmlyc3ROYW1lIjoibW9oYW1lZCIsIkxhc3ROYW1lIjoiYWxhYWEiLCJfX3YiOjB9LCJpYXQiOjE1MjM5OTA4OTEsImV4cCI6MTUyNDAzNDA5MX0.GkEHyII0Xl11-N_MSk1dNESgj4tSXSjGs6voBNtdmn8')
   .end((err, res) => {
   res.should.have.status(200);
   res.body.data.should.be.a('array');   
   done();
   });
   });
   });



   describe('/POST Threads', () => {
    it('it should not POST a Thread without body field' , (done) => {
     let Thread = {
     WriterEmail: "ahmeeeddd@gmail.com" ,
}
chai.request('http://localhost:3000/api/')
.post('threads/createThread')
.set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlN0YXJ0VXBzIjpbXSwiUmF0aW5nIjo1LCJCbG9ja2luZ1N0YXR1cyI6ZmFsc2UsIkV4cGVydCI6ZmFsc2UsIlRvcGljcyI6W10sIlByZXZpb3VzRXhwZXJpbmNlcyI6W10sIk15U2NoZWR1bGUiOltdLCJNeUludGVydmlld3MiOltdLCJDcmVhdGVkQXQiOiIyMDE4LTA0LTE2VDIxOjAzOjQxLjUzOVoiLCJfaWQiOiI1YWQ1MGZhZDFlNjA2OTNhNTAwMmRhMjgiLCJlbWFpbCI6ImFobWVlZWRAZ21haWwuY29tIiwiRmlyc3ROYW1lIjoibW9oYW1lZCIsIkxhc3ROYW1lIjoiYWxhYWEiLCJfX3YiOjB9LCJpYXQiOjE1MjM5OTA4OTEsImV4cCI6MTUyNDAzNDA5MX0.GkEHyII0Xl11-N_MSk1dNESgj4tSXSjGs6voBNtdmn8')

     .send(Thread)
     .end((err, res) => {
     res.should.have.status(422);
          res.body.should.have.property('msg').eql('Body(String) is a required field ' );
     done();
    });});});


    describe('/POST Threads', () => {
    it('it should POST a Thread ' , (done) => {
      let thread = {
        WriterEmail: "ahmeeeddd@gmail.com" ,
        Body: "HEYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYsssYYzz" ,
     }
     chai.request('http://localhost:3000/api/')
    .post('threads/createThread').send(thread)
.set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlN0YXJ0VXBzIjpbXSwiUmF0aW5nIjo1LCJCbG9ja2luZ1N0YXR1cyI6ZmFsc2UsIkV4cGVydCI6ZmFsc2UsIlRvcGljcyI6W10sIlByZXZpb3VzRXhwZXJpbmNlcyI6W10sIk15U2NoZWR1bGUiOltdLCJNeUludGVydmlld3MiOltdLCJDcmVhdGVkQXQiOiIyMDE4LTA0LTE2VDIxOjAzOjQxLjUzOVoiLCJfaWQiOiI1YWQ1MGZhZDFlNjA2OTNhNTAwMmRhMjgiLCJlbWFpbCI6ImFobWVlZWRAZ21haWwuY29tIiwiRmlyc3ROYW1lIjoibW9oYW1lZCIsIkxhc3ROYW1lIjoiYWxhYWEiLCJfX3YiOjB9LCJpYXQiOjE1MjM5OTA4OTEsImV4cCI6MTUyNDAzNDA5MX0.GkEHyII0Xl11-N_MSk1dNESgj4tSXSjGs6voBNtdmn8')
.end((err, res) => {
      res.should.have.status(201);
      
      res.body.should.be.a('object');
      res.body.should.have.property('msg').eql('Thread was created successfully.' );

      done();
      });});});


describe('/POST comments', () => {
  it('it should not POST a comment without body field' , (done) => {
   let comment = {
   WriterEmail: "ahmeeeddd@gmail.com" ,
}
chai.request('http://localhost:3000/api/')
.post('/comments/createComment/5ad513706c2b373150454363')
.set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlN0YXJ0VXBzIjpbXSwiUmF0aW5nIjo1LCJCbG9ja2luZ1N0YXR1cyI6ZmFsc2UsIkV4cGVydCI6ZmFsc2UsIlRvcGljcyI6W10sIlByZXZpb3VzRXhwZXJpbmNlcyI6W10sIk15U2NoZWR1bGUiOltdLCJNeUludGVydmlld3MiOltdLCJDcmVhdGVkQXQiOiIyMDE4LTA0LTE2VDIxOjAzOjQxLjUzOVoiLCJfaWQiOiI1YWQ1MGZhZDFlNjA2OTNhNTAwMmRhMjgiLCJlbWFpbCI6ImFobWVlZWRAZ21haWwuY29tIiwiRmlyc3ROYW1lIjoibW9oYW1lZCIsIkxhc3ROYW1lIjoiYWxhYWEiLCJfX3YiOjB9LCJpYXQiOjE1MjM5OTA4OTEsImV4cCI6MTUyNDAzNDA5MX0.GkEHyII0Xl11-N_MSk1dNESgj4tSXSjGs6voBNtdmn8')

   .send(comment)
   .end((err, res) => {
   res.should.have.status(422);
        res.body.should.have.property('msg').eql('Body(String) is a required field ' );
   done();
  });});});


      describe('/POST Comment', () => {
it('it should Post a Comment ' , (done) => {
let comment = {
WriterEmail: "ahmeeeddd@gmail.com" ,
Body: "omamar" ,
}
chai.request('http://localhost:3000/api/')
.post('/comments/createComment/5ad513706c2b373150454363').send(comment)
.set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlN0YXJ0VXBzIjpbXSwiUmF0aW5nIjo1LCJCbG9ja2luZ1N0YXR1cyI6ZmFsc2UsIkV4cGVydCI6ZmFsc2UsIlRvcGljcyI6W10sIlByZXZpb3VzRXhwZXJpbmNlcyI6W10sIk15U2NoZWR1bGUiOltdLCJNeUludGVydmlld3MiOltdLCJDcmVhdGVkQXQiOiIyMDE4LTA0LTE2VDIxOjAzOjQxLjUzOVoiLCJfaWQiOiI1YWQ1MGZhZDFlNjA2OTNhNTAwMmRhMjgiLCJlbWFpbCI6ImFobWVlZWRAZ21haWwuY29tIiwiRmlyc3ROYW1lIjoibW9oYW1lZCIsIkxhc3ROYW1lIjoiYWxhYWEiLCJfX3YiOjB9LCJpYXQiOjE1MjM5OTA4OTEsImV4cCI6MTUyNDAzNDA5MX0.GkEHyII0Xl11-N_MSk1dNESgj4tSXSjGs6voBNtdmn8')
.end((err, res) => {
res.should.have.status(201);
res.body.should.be.a('object');
res.body.should.have.property('msg').eql('Comment was created successfully.' );

done();
});});});

describe('/PATCH Comment', () => {
  it('it should UPDATE a comment', (done) => {
    chai.request('http://localhost:3000/api/')
   .patch('comments/updateComment/5ad6684a6f05f94550c54e3f/5ad65f5c53a52e46201113b1').send({Body : "Alaa"})
   .set('Authorization',
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlN0YXJ0VXBzIjpbXSwiUmF0aW5nIjo1LCJCbG9ja2luZ1N0YXR1cyI6ZmFsc2UsIkV4cGVydCI6ZmFsc2UsIlRvcGljcyI6W10sIlByZXZpb3VzRXhwZXJpbmNlcyI6W10sIk15U2NoZWR1bGUiOltdLCJNeUludGVydmlld3MiOltdLCJDcmVhdGVkQXQiOiIyMDE4LTA0LTE2VDIxOjAzOjQxLjUzOVoiLCJfaWQiOiI1YWQ1MGZhZDFlNjA2OTNhNTAwMmRhMjgiLCJlbWFpbCI6ImFobWVlZWRAZ21haWwuY29tIiwiRmlyc3ROYW1lIjoibW9oYW1lZCIsIkxhc3ROYW1lIjoiYWxhYWEiLCJfX3YiOjB9LCJpYXQiOjE1MjM5OTA4OTEsImV4cCI6MTUyNDAzNDA5MX0.GkEHyII0Xl11-N_MSk1dNESgj4tSXSjGs6voBNtdmn8')  
    .end((err, res) => {
   res.should.have.status(201);
   res.body.should.have.property('msg').eql('Comment was Updated successfully.');
   

   
   done();
   });
   });
   });


   describe('/PATCH Comment', () => {
    it('it should UPDATE a comment', (done) => {
      chai.request('http://localhost:3000/api/')
     .patch('comments/updateComment/5ad6684a6f05f94550c54e3f/5ad65f5c53a52e46201113b1')
     .set('Authorization',
     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlN0YXJ0VXBzIjpbXSwiUmF0aW5nIjo1LCJCbG9ja2luZ1N0YXR1cyI6ZmFsc2UsIkV4cGVydCI6ZmFsc2UsIlRvcGljcyI6W10sIlByZXZpb3VzRXhwZXJpbmNlcyI6W10sIk15U2NoZWR1bGUiOltdLCJNeUludGVydmlld3MiOltdLCJDcmVhdGVkQXQiOiIyMDE4LTA0LTE2VDIxOjAzOjQxLjUzOVoiLCJfaWQiOiI1YWQ1MGZhZDFlNjA2OTNhNTAwMmRhMjgiLCJlbWFpbCI6ImFobWVlZWRAZ21haWwuY29tIiwiRmlyc3ROYW1lIjoibW9oYW1lZCIsIkxhc3ROYW1lIjoiYWxhYWEiLCJfX3YiOjB9LCJpYXQiOjE1MjM5OTA4OTEsImV4cCI6MTUyNDAzNDA5MX0.GkEHyII0Xl11-N_MSk1dNESgj4tSXSjGs6voBNtdmn8')  
      .end((err, res) => {
     res.should.have.status(422);
     res.body.should.have.property('msg').eql('Body is required ');

     
  
     
     done();
     });
     });
     });


     describe('/DELETE Comment /:id comment /: Id thread' , () => {
      it('it should Delete a Comment given the id of it and the id of the thread' , (done) => {
       let comment = new Comment({WriterEmail: "ahmeeeddd@gmail.com" , Body: "C.S. Lewis", Likes:
      1948, Dislikes: 778, createdAt:' 1/1/2017'  , Verified:'eshta' })
       comment.save((err, comment) => {
        chai.request('http://localhost:3000/api/')
        .delete('/comments/deleteComment/5ad6508bc087fc483cdd06cc/5ad513706c2b373150454363')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlN0YXJ0VXBzIjpbXSwiUmF0aW5nIjo1LCJCbG9ja2luZ1N0YXR1cyI6ZmFsc2UsIkV4cGVydCI6ZmFsc2UsIlRvcGljcyI6W10sIlByZXZpb3VzRXhwZXJpbmNlcyI6W10sIk15U2NoZWR1bGUiOltdLCJNeUludGVydmlld3MiOltdLCJDcmVhdGVkQXQiOiIyMDE4LTA0LTE2VDIxOjAzOjQxLjUzOVoiLCJfaWQiOiI1YWQ1MGZhZDFlNjA2OTNhNTAwMmRhMjgiLCJlbWFpbCI6ImFobWVlZWRAZ21haWwuY29tIiwiRmlyc3ROYW1lIjoibW9oYW1lZCIsIkxhc3ROYW1lIjoiYWxhYWEiLCJfX3YiOjB9LCJpYXQiOjE1MjM5OTA4OTEsImV4cCI6MTUyNDAzNDA5MX0.GkEHyII0Xl11-N_MSk1dNESgj4tSXSjGs6voBNtdmn8')
       .end((err, res) => {
       res.should.have.status(404);
   res.body.should.be.a('object');
       res.body.should.have.property('msg').eql('Comment not found.' );
       done();});});});});

     






     describe('/DELETE Comment /:id comment /: Id thread' , () => {
      it('it should Delete a Comment given the id of it and the id of the thread' , (done) => {
       let comment = new Comment({WriterEmail: "ahmeeeddd@gmail.com" , Body: "C.S. Lewis", Likes:
      1948, Dislikes: 778, createdAt:' 1/1/2017'  , Verified:'eshta' })
       comment.save((err, comment) => {
        chai.request('http://localhost:3000/api/')
        .delete('/comments/deleteComment/5ad650559058df4434719d8a/5ad513706c2b373150454363')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlN0YXJ0VXBzIjpbXSwiUmF0aW5nIjo1LCJCbG9ja2luZ1N0YXR1cyI6ZmFsc2UsIkV4cGVydCI6ZmFsc2UsIlRvcGljcyI6W10sIlByZXZpb3VzRXhwZXJpbmNlcyI6W10sIk15U2NoZWR1bGUiOltdLCJNeUludGVydmlld3MiOltdLCJDcmVhdGVkQXQiOiIyMDE4LTA0LTE2VDIxOjAzOjQxLjUzOVoiLCJfaWQiOiI1YWQ1MGZhZDFlNjA2OTNhNTAwMmRhMjgiLCJlbWFpbCI6ImFobWVlZWRAZ21haWwuY29tIiwiRmlyc3ROYW1lIjoibW9oYW1lZCIsIkxhc3ROYW1lIjoiYWxhYWEiLCJfX3YiOjB9LCJpYXQiOjE1MjM5OTA4OTEsImV4cCI6MTUyNDAzNDA5MX0.GkEHyII0Xl11-N_MSk1dNESgj4tSXSjGs6voBNtdmn8')
       .end((err, res) => {
       res.should.have.status(200);
   res.body.should.be.a('object');
       res.body.should.have.property('msg').eql('Comment was deleted successfully.' );
       done();});});});});
       describe('/updateThread', () => {
        it('thread id must be a valid object',function (done) {
           
          chai.request('http://localhost:3000/api/').patch('threads/updateThread/:123456789').
          set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlN0YXJ0VXBzIjpbXSwiUmF0aW5nIjo1LCJCbG9ja2luZ1N0YXR1cyI6ZmFsc2UsIkV4cGVydCI6ZmFsc2UsIlRvcGljcyI6W10sIlByZXZpb3VzRXhwZXJpbmNlcyI6W10sIk15U2NoZWR1bGUiOlt7Il9pZCI6IjVhYzdmNWE4ODNkMjY5MmFiODM0OTNmNiIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbiIsIkRhdGVUaW1lIjoiMjAxOC0wNC0wMlQwMDowNDowNS4zNzhaIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSJ9LHsiX2lkIjoiNWFjY2M2MzU1NjIyNWIwYmJjNjUxYzQ5IiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoic29mdHdhcmUgZGV2ZWxvcG1lbnQiLCJEYXRlVGltZSI6IjIwMTgtMDQtMDFUMTQ6MDk6NTYuMDAwWiJ9XSwiTXlJbnRlcnZpZXdzIjpbXSwiQ3JlYXRlZEF0IjoiMjAxOC0wNC0wNlQyMjozMTowNS4wMDlaIiwiX2lkIjoiNWFjN2Y1Mjg4M2QyNjkyYWI4MzQ5M2Y0IiwiRmlyc3ROYW1lIjoibW9tZW4iLCJMYXN0TmFtZSI6ImFtZ2FkIiwiZW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIl9fdiI6MjR9LCJpYXQiOjE1MjUyMTA2NDYsImV4cCI6MTUyNTI1Mzg0Nn0.LCtii5gnVCPhEWWCYtO2yMvXyVUR3hqVc-bMD2JgeKc').
            end(function (err, res) {
              if (err) {
                done(err);
              } else {
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.should.have.property('msg').eql('Thread must be valid ObjectId.');
                done();
              }
            });}
          );
          it('No thread with this id 404',function (done) {
           
            chai.request('http://localhost:3000/api/').patch('threads/updateThread/5ad759b1c5396f2c903ba8d0').
            set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlN0YXJ0VXBzIjpbXSwiUmF0aW5nIjo1LCJCbG9ja2luZ1N0YXR1cyI6ZmFsc2UsIkV4cGVydCI6ZmFsc2UsIlRvcGljcyI6W10sIlByZXZpb3VzRXhwZXJpbmNlcyI6W10sIk15U2NoZWR1bGUiOlt7Il9pZCI6IjVhYzdmNWE4ODNkMjY5MmFiODM0OTNmNiIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbiIsIkRhdGVUaW1lIjoiMjAxOC0wNC0wMlQwMDowNDowNS4zNzhaIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSJ9LHsiX2lkIjoiNWFjY2M2MzU1NjIyNWIwYmJjNjUxYzQ5IiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoic29mdHdhcmUgZGV2ZWxvcG1lbnQiLCJEYXRlVGltZSI6IjIwMTgtMDQtMDFUMTQ6MDk6NTYuMDAwWiJ9XSwiTXlJbnRlcnZpZXdzIjpbXSwiQ3JlYXRlZEF0IjoiMjAxOC0wNC0wNlQyMjozMTowNS4wMDlaIiwiX2lkIjoiNWFjN2Y1Mjg4M2QyNjkyYWI4MzQ5M2Y0IiwiRmlyc3ROYW1lIjoibW9tZW4iLCJMYXN0TmFtZSI6ImFtZ2FkIiwiZW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIl9fdiI6MjR9LCJpYXQiOjE1MjUyMTA2NDYsImV4cCI6MTUyNTI1Mzg0Nn0.LCtii5gnVCPhEWWCYtO2yMvXyVUR3hqVc-bMD2JgeKc').
              end(function (err, res) {
                if (err) {
                  done(err);
                } else {
                  res.should.have.status(404);
                  res.body.should.be.a('object');
                  res.body.should.have.property('msg').eql('Thread not found.');
                  done();
                }
              });}
            );
        it('it should UPDATE the Thread', (done) => {
          chai.request('http://localhost:3000/api/')
         .patch('/threads/updateThread/5ae8e22221405e2c7096ee32')
         .send({Body : 'hiii'})
         .set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlN0YXJ0VXBzIjpbXSwiUmF0aW5nIjo1LCJCbG9ja2luZ1N0YXR1cyI6ZmFsc2UsIkV4cGVydCI6ZmFsc2UsIlRvcGljcyI6W10sIlByZXZpb3VzRXhwZXJpbmNlcyI6W10sIk15U2NoZWR1bGUiOlt7Il9pZCI6IjVhYzdmNWE4ODNkMjY5MmFiODM0OTNmNiIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoiY3NlbiIsIkRhdGVUaW1lIjoiMjAxOC0wNC0wMlQwMDowNDowNS4zNzhaIiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSJ9LHsiX2lkIjoiNWFjY2M2MzU1NjIyNWIwYmJjNjUxYzQ5IiwiU2Vla2VyRW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIkV4cGVydEVtYWlsIjoiaGFuYW5AZ21haWwuY29tIiwiVG9waWNOYW1lIjoic29mdHdhcmUgZGV2ZWxvcG1lbnQiLCJEYXRlVGltZSI6IjIwMTgtMDQtMDFUMTQ6MDk6NTYuMDAwWiJ9XSwiTXlJbnRlcnZpZXdzIjpbXSwiQ3JlYXRlZEF0IjoiMjAxOC0wNC0wNlQyMjozMTowNS4wMDlaIiwiX2lkIjoiNWFjN2Y1Mjg4M2QyNjkyYWI4MzQ5M2Y0IiwiRmlyc3ROYW1lIjoibW9tZW4iLCJMYXN0TmFtZSI6ImFtZ2FkIiwiZW1haWwiOiJhZGFtQGdtYWlsLmNvbSIsIl9fdiI6MjR9LCJpYXQiOjE1MjUyMTA2NDYsImV4cCI6MTUyNTI1Mzg0Nn0.LCtii5gnVCPhEWWCYtO2yMvXyVUR3hqVc-bMD2JgeKc').
         end((err, res) => {
      
          res.should.have.status(200);
          res.body.should.have.property('data');
          res.body.should.have.property('msg').eql('Thread was updated successfully.');
       
         done();
         });
         });
         });