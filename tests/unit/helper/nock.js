var nock = require('nock');

nock('https://android.googleapis.com:443')
    .post('/gcm/send', function (body) {
        return !body.to || body.to === 'NotRegistered';
    })
    .twice()
    .reply(200, {
        multicast_id: 5201523458607294000,
        success: 0,
        failure: 1,
        canonical_ids: 0,
        results: [
            {
                error: 'NotRegistered'
            }
        ]
    });

nock('https://android.googleapis.com:443')
    .post('/gcm/send', function (body) {
        return body.data.length > 100;
    })
    .reply(200, {
        multicast_id: 5201523458607294000,
        success: 0,
        failure: 1,
        canonical_ids: 0,
        results: [
            {
                error: 'MessageTooBig'
            }
        ]
    });

nock('https://android.googleapis.com:443')
    .post('/gcm/send', function (body) {
        if(!body.time_to_live){
            return false;
        }
        var ttl = parseInt(body.time_to_live);
        return isNaN(ttl) || ttl < 0;
    })
    .reply(200, {
        multicast_id: 5201523458607294000,
        success: 0,
        failure: 1,
        canonical_ids: 0,
        results: [
            {
                error: 'InvalidTtl'
            }
        ]
    });

nock('https://android.googleapis.com:443')
    .post('/gcm/send', function (body) {
        return body.data === 'RateExceeded';
    })
    .reply(200, {
        multicast_id: 5201523458607294000,
        success: 0,
        failure: 1,
        canonical_ids: 0,
        results: [
            {
                error: 'DeviceMessageRateExceeded'
            }
        ]
    });

nock('https://android.googleapis.com:443')
    .post('/gcm/send', function (body) {
        return true;
    })
    .reply(200, {
        multicast_id: 5201523458607294000,
        success: 1,
        failure: 0,
        canonical_ids: 0,
        results: [
            {
                message_id: '5:201523458607294000'
            }
        ]
    });
