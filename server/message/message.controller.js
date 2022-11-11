const msgModel = require('./message.model');

class MsgController {

    getAllMsg(request, respond) {
      msgModel.find((error, msgs) => {
                if (error) {
                  console.log(error)
                }

                respond.status(200).json({
                    success: true,
                    message: 'Done!',
                    msgs: msgs
                });
            }
        );
    }
}

module.exports = new MsgController();