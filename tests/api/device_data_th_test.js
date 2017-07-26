let request = require('supertest'),
	assert = require('assert'),
	debug = require('debug')('tempmon:test'),
	app = require('../../app'),
	mongo = require('../../db/mongo');

const insert = function (callback) {
	const dummy = {
		node_id: '500',
		time: 1520852011496,
	};
	mongo.collection('device_data_th').insert(dummy, callback);
};
describe('Device Data TH (tempmon) Endpoints', () => {
	before(function (done) {
    // Needed for could db connection
		this.timeout(10000);
		const device_data_th = [
			{
				node_id: '600',
				time: 2520852011496,
			},
			{ temperature: '55' },
			{
				node_id: '007',
				humidity: '88',
			},
		];
		mongo.collection('device_data_th').insert(device_data_th, (err, data) => {
			if (err) {
				throw err;
			}
			debug('Describe..' + JSON.stringify(data));
			done();
		});
	});

	afterEach(done => {
		mongo.collection('device_data_th').remove({}, done);
	});
	it('GET /device_data_th | returns all devices', function (done) {
		this.timeout(5000);
		request(app)
      .get('/device_data_th')
      .end((err, response) => {
	const body = response.body;
	assert.equal(body.length, 3);
	assert.equal(body[0].node_id, '600');
	assert.equal(body[2].humidity, '88');
	done();
});
	});
	it('GET /device_data_th/:_id', function (done) {
		this.timeout(5000);
		insert((err, result) => {
			const _id = result._id;
			request(app)
        .get(`/device_data_th/${ _id }`)
        .end((err, response) => {
	const body = response.body;
	delete body._id;
	assert.deepEqual(body, {
		node_id: '500',
		time: 1520852011496,
	});
	done();
});
		});
	});
	it('GET /device_data_th/:_id not found', function (done) {
		this.timeout(5000);
		const _id = '55555aaaaa55555aaaaa4444';
		request(app)
      .get(`/device_data_th/${ _id }`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, response) => {
	const body = response.body;
	assert.equal(response.statusCode, 404);
	done();
});
	});
	it('POST /device_data_th', function (done) {
		this.timeout(5000);
		const esp = {
			node_id: '800',
			time: 7720852011496,
		};
		request(app)
      .post('/device_data_th')
      .send(esp)
      .expect(201)
      .end((err, response) => {
	const body = response.body;
	assert.equal(body.node_id, '800');
	assert.ok(body._id);
	done();
});
	});
	it('PUT /device_data_th/:_id', function (done) {
		this.timeout(5000);
		insert((err, result) => {
			const _id = result._id;
			request(app)
        .put(`/device_data_th/${ _id }`)
        .send({ node_id: '444' })
        .end((err, response) => {
	const body = response.body;
          // Não podemos comparar o obj abaixo pois com acesso nuvem a resposta é diferente
          // assert.deepEqual(body, { ok: true, n: 1, updatedExisting: true });
	assert.equal(body.ok, 1);
	assert.equal(body.n, 1);
	assert.equal(body.nModified, 1);
	done();
});
		});
	});
	it('DELETE /device_data_th/:_id', function (done) {
		this.timeout(5000);
		insert((err, result) => {
			const _id = result._id;
			request(app)
        .delete(`/device_data_th/${ _id }`)
        .end((err, response) => {
	const body = response.body;
          // Não podemos comparar o obj abaixo pois com acesso nuvem a resposta é diferente
          // assert.deepEqual(body, { n: 1 });
	assert.equal(body.ok, 1);
	assert.equal(body.n, 1);
	done();
});
		});
	});

	it('GET /device_data_th (send condition met email)', function (done) {
		this.timeout(5000);
		const esp = {
			node_id: '999',
			temperature: '90',
		};
		request(app)
      .get('/device_data_th')
      .send(esp)
      .expect(201)
      .end((err, response) => {
	const body = response.body;
        // { "node_id" : "999", time: 909000909090, log: "EmailSent" }
	assert.equal(body.node_id, '999');
	assert.equal(body.log, 'EmailSent');
	done();
});
	});

});// describe
