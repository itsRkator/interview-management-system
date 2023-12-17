const BASE_URL = "http://localhost:4300/api";

export interface SignUpResponse {
  success: boolean;
  message?: string;
}

export interface SignInResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export interface Candidate {
  id: string;
  candidateName?: string;
  interviewStatus?: string;
  interviewFeedback?: string;
  rating?: number;
}

export const signUp = async (
  username: string,
  firstName: string,
  lastName: string,
  password: string,
  confirmPassword: string
): Promise<SignUpResponse> => {
  try {
    if (!username || !firstName || !lastName || !password || !confirmPassword) {
      throw new Error("All fields are required");
    }
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        password,
        confirmPassword,
      }),
    });

    if (!response.ok) {
      throw new Error("Sign-Up Failed");
    }
    return await response.json();
  } catch (err) {
    throw new Error("Failed to Sign-Up");
  }
};

export const signIn = async (
  username: string,
  password: string
): Promise<SignInResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error("Invalid Credentials");
    }
    return await response.json();
  } catch (err) {
    throw new Error("Failed to Sign-In");
  }
};

export const fetchCandidates = async (): Promise<Candidate[]> => {
  try {
    const ApiResponse = await fetch(`${BASE_URL}/interview/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!ApiResponse.ok) {
      throw new Error("Failed to fetch candidates");
    }

    const response = await ApiResponse.json();
    const candidates = response.data.map((candidate:any) => {
      return {
        id: candidate._id,
        candidateName: candidate.candidateName,
        interviewStatus: candidate.interviewStatus,
        interviewFeedback: candidate.interviewFeedback,
        rating: candidate.rating,
      };
    })

    return candidates;
  } catch (error) {
    throw new Error("Failed to fetch candidates");
  }
};

export const fetchCandidateById = async (id: string): Promise<Candidate> => {
  try {
    const apiResponse = await fetch(`${BASE_URL}/interview/all/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!apiResponse.ok) {
      throw new Error("Failed to fetch candidate");
    }
    const responseData = await apiResponse.json();
    const candidate = responseData.data.map((candidate: any) => {
      return {
        id: candidate._id,
        candidateName: candidate.candidateName,
        interviewStatus: candidate.interviewStatus,
        interviewFeedback: candidate.interviewFeedback,
        rating: candidate.rating,
      };
    });
    return candidate;
  } catch (error) {
    throw new Error("Failed to fetch candidate");
  }
};

export const addCandidate = async (candidateData: any): Promise<Candidate> => {
  try {
    const response = await fetch(`${BASE_URL}/interview/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(candidateData),
    });

    if (!response.ok) {
      throw new Error("Failed to add candidate");
    }

    return await response.json();
  } catch (error) {
    throw new Error("Failed to add candidate");
  }
};

export const updateCandidate = async (
  candidateId: string,
  updatedData: any
): Promise<Candidate> => {
  try {
    const response = await fetch(
      `${BASE_URL}/interview/update/${candidateId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update candidate");
    }

    return await response.json();
  } catch (error) {
    throw new Error("Failed to update candidate");
  }
};

export const deleteCandidate = async (candidateId: string): Promise<void> => {
  try {
    const response = await fetch(
      `${BASE_URL}/interview/delete/${candidateId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete candidate");
    }
  } catch (error) {
    throw new Error("Failed to delete candidate");
  }
};

export const searchCandidates = async (query: string): Promise<Candidate[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/interview/search?query=${query}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to search candidates");
    }

    return await response.json();
  } catch (error) {
    throw new Error("Failed to search candidates");
  }
};

export const filterCandidates = async (filters: any): Promise<Candidate[]> => {
  try {
    const response = await fetch(`${BASE_URL}/interview/filter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(filters),
    });

    if (!response.ok) {
      throw new Error("Failed to filter candidates");
    }

    return await response.json();
  } catch (error) {
    throw new Error("Failed to filter candidates");
  }
};
