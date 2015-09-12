describe "User", ->

  describe "#profile", ->
    it "profile is valid format", ->
      user = new User("Tanaka", 24)
      expect(user.profile()).toEqual("Tanaka : 24")