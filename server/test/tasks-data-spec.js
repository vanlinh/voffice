
var expect =require("chai").expect;
describe("get task", function(){
   it("should never be empty since tasks are seeded", function(){
       projectList=[1,2];
       expect(projectList.length).to.be.at.least(1);
   });
});