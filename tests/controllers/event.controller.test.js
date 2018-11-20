let Events = require('../../controllers/event.controller');
const chai = require('chai');
const expect = require('chai').expect
const should = chai.should();
const sinon = require('sinon')

const EventsController = require('../../controllers/event.controller').EventsController



describe('events', function () {
    const ctx = {
        method: 'POST',
        request: {
            body: {
                userId: "c6708eb5-3916-485b-827f-caa521ad916a",
                eventId: "4ac9f87d-775d-47e7-bacb-04cacefa9167",
                startTime: "2018-09-20 09:58:43.482+02"
            }
        }
    }

    describe('create event', function () {

        it('should return an object', async function () {
            sinon.stub(Events, "createEvent").returns({id: "jeff"})
            await expect(Events.createEvent(ctx)).to.be.an("object");
        })

        it('should have property active', function () {
            ctx.body.should.have.property('active');
        })

        it('should have property active', function () {
            ctx.body.should.have.property('active');
        })

        it('should call the middleware on wrong request method', async function () {
            const ctx = { method: 'GET' }
            const spy = sinon.spy();
            await Events.createEvent(ctx, spy);
            spy.calledOnce.should.be.true;
        })

        it('should have status of type number', async function () {
            await Events.createEvent(ctx);
            ctx.status.should.be.a('number');
        })
    })


    describe('join event', function () {
        const participationModelMock = {
            create: () => {
                return {
                    id: "create"
                }
            }
        };
        const eventController = new EventsController(participationModelMock);

        it('should return an object on create', async function () {
            expect(await eventController.joinEvent(ctx).create()).to.be.an("object");
        })
        it('should have an object property id with value create', async function() {
            expect(await eventController.joinEvent(ctx).create().to.have.property('id'));
        })
    })



})
