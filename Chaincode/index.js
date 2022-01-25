'use strict';
const SampleContract = require("./lib/samplecontract")
const PoliceContract =  require("./lib/police-contract")
const AnonymousContract = require("./lib/anonymous-contract")
// const PersonalChatSystemContract = require("./lib/personal-chat-system-contract")
const SecureChatContract =  require("./lib/secure-chat-contract")


module.exports.SampleContract = SampleContract;
module.exports.PoliceContract = PoliceContract;
module.exports.AnonymousContract = AnonymousContract;
// module.exports.PersonalChatSystemContract = PersonalChatSystemContract

module.exports.SecureChatContract = SecureChatContract
module.exports.contracts=[SampleContract,PoliceContract,AnonymousContract,SecureChatContract];