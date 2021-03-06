import {
  fetchIsLoading,
  fetchErrored,
  userFetchSuccess,
  fetchDatabase
} from './index';

describe("Login Actions", () => {
  let mockUrl;
  let mockEmail;
  let mockPassword;
  let mockDispatch;
  let mockUserId;

  beforeEach(() => {
    mockUrl = 'www.ok.com';
    mockEmail = 'ok@gmail.com';
    mockPassword = 'password';
    mockDispatch = jest.fn();
    mockUserId = 4;
  });

  describe("fetchIsLoading", () => {
    it("should return type FETCH_LOADING", () => {
      const bool = false;
      const expected = {
        type: 'FETCH_LOADING',
        isLoading: bool
      };

      expect(fetchIsLoading(bool)).toEqual(expected);
    });
  });

  describe("fetchErrored", () => {
    it("should return type FETCH_ERRORED", () => {
      const bool = false;
      const expected = {
        type: 'FETCH_ERRORED',
        isErrored: bool
      };

      expect(fetchErrored(bool)).toEqual(expected);
    });
  });

  describe("userFetchSuccess", () => {
    it("should return type USER_FETCH_SUCCESS", () => {
      const userId = {userId: 3};
      const expected = {
        type: 'USER_FETCH_SUCCESS',
        userId
      };
      expect(userFetchSuccess(userId)).toEqual(expected);
    });
  });

  describe("fetchDatabase", () => {
    it('should dispatch fetchIsLoading by default', async () => {
      const expected = fetchIsLoading(true);
      const thunk = fetchDatabase(mockUrl, mockEmail, mockPassword);
  
      await thunk(mockDispatch);
      expect(mockDispatch).toHaveBeenCalledWith(expected);
    });
    it("should call fetch with correct parameters", async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        });
      });
  
      const expected = ['www.ok.com', {
        method: 'POST',
        body: JSON.stringify(
          {
            password: mockPassword,
            email: mockEmail
          }
        ),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      ];

      const thunk = fetchDatabase(mockUrl, mockEmail, mockPassword);
      await thunk(mockDispatch);
  
      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });
  
  
    it("should dispatch fetchErrored if fetch fails", async () => { 
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('could not fetch'));
      });
      
      const expected = fetchErrored(true);
      const thunk = fetchDatabase(mockUrl, mockEmail, mockPassword);
  
      await thunk(mockDispatch);
      expect(mockDispatch).toHaveBeenCalledWith(expected);
  
    });

    it("should dispatch fetchErrored if status is not ok", async () => { 
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 500,
          ok: false,
          json: () => Promise.resolve({})
        });
      });
      
      const expected = fetchErrored(true);
      const thunk = fetchDatabase(mockUrl, mockEmail, mockPassword);
  
      await thunk(mockDispatch);
      expect(mockDispatch).toHaveBeenCalledWith(expected);
    });

    it("should dispatch fetchIsLoading if status is not ok", async () => { 
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 500,
          ok: false,
          json: () => Promise.resolve({})
        });
      });
      
      const expected = fetchIsLoading(false);
      const thunk = fetchDatabase(mockUrl, mockEmail, mockPassword);
  
      await thunk(mockDispatch);
      expect(mockDispatch).toHaveBeenCalledWith(expected);
    });

    it("should dispatch userFetchSuccess if status is ok", async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({
            data: {id: 4, name: "cam", password: "asdf", email: "cam@gmail.com"}
          })
        });
      });

      const expected = userFetchSuccess(4);
      const thunk = fetchDatabase(mockUrl, mockEmail, mockPassword);
      await thunk(mockDispatch);
      expect(mockDispatch).toHaveBeenCalledWith(expected);
    });
  });
});