import React, { useState } from "react";

function Testpage() {
  return (
    <>
      {/* <!-- Profile 1 - Bootstrap Brain Component --> */}
      <section class="bg-light py-3 py-md-5 py-xl-8">
        <div class="container">
          <div class="row justify-content-md-center">
            <div class="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
              <h2 class="mb-4 display-5 text-center">Profile</h2>
              <p class="text-secondary text-center lead fs-4 mb-5">The Profile page is your digital hub, where you can fine-tune your experience. Here's a closer look at the settings you can expect to find in your profile page.</p>
              <hr class="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row gy-4 gy-lg-0">
            <div class="col-12 col-lg-4 col-xl-3">
              <div class="row gy-4">
                <div class="col-12">
                  <div class="card widget-card border-light shadow-sm">
                    <div class="card-header text-bg-primary">Welcome, Ethan Leo</div>
                    <div class="card-body">
                      <div class="text-center mb-3">
                        <img src="./assets/img/profile-img-1.jpg" class="img-fluid rounded-circle" alt="Luna John" />
                      </div>
                      <h5 class="text-center mb-1">Ethan Leo</h5>
                      <p class="text-center text-secondary mb-4">Project Manager</p>
                      <ul class="list-group list-group-flush mb-4">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                          <h6 class="m-0">Followers</h6>
                          <span>7,854</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                          <h6 class="m-0">Following</h6>
                          <span>5,987</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                          <h6 class="m-0">Friends</h6>
                          <span>4,620</span>
                        </li>
                      </ul>
                      <div class="d-grid m-0">
                        <button class="btn btn-outline-primary" type="button">Follow</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="card widget-card border-light shadow-sm">
                    <div class="card-header text-bg-primary">Social Accounts</div>
                    <div class="card-body">
                      <a href="#!" class="d-inline-block bg-dark link-light lh-1 p-2 rounded">
                        <i class="bi bi-youtube"></i>
                      </a>
                      <a href="#!" class="d-inline-block bg-dark link-light lh-1 p-2 rounded">
                        <i class="bi bi-twitter-x"></i>
                      </a>
                      <a href="#!" class="d-inline-block bg-dark link-light lh-1 p-2 rounded">
                        <i class="bi bi-facebook"></i>
                      </a>
                      <a href="#!" class="d-inline-block bg-dark link-light lh-1 p-2 rounded">
                        <i class="bi bi-linkedin"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="card widget-card border-light shadow-sm">
                    <div class="card-header text-bg-primary">About Me</div>
                    <div class="card-body">
                      <ul class="list-group list-group-flush mb-0">
                        <li class="list-group-item">
                          <h6 class="mb-1">
                            <span class="bii bi-mortarboard-fill me-2"></span>
                            Education
                          </h6>
                          <span>M.S Computer Science</span>
                        </li>
                        <li class="list-group-item">
                          <h6 class="mb-1">
                            <span class="bii bi-geo-alt-fill me-2"></span>
                            Location
                          </h6>
                          <span>Mountain View, California</span>
                        </li>
                        <li class="list-group-item">
                          <h6 class="mb-1">
                            <span class="bii bi-building-fill-gear me-2"></span>
                            Company
                          </h6>
                          <span>GitHub Inc</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="card widget-card border-light shadow-sm">
                    <div class="card-header text-bg-primary">Skills</div>
                    <div class="card-body">
                      <span class="badge text-bg-primary">HTML</span>
                      <span class="badge text-bg-primary">SCSS</span>
                      <span class="badge text-bg-primary">Javascript</span>
                      <span class="badge text-bg-primary">React</span>
                      <span class="badge text-bg-primary">Vue</span>
                      <span class="badge text-bg-primary">Angular</span>
                      <span class="badge text-bg-primary">UI</span>
                      <span class="badge text-bg-primary">UX</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-8 col-xl-9">
              <div class="card widget-card border-light shadow-sm">
                <div class="card-body p-4">
                  <ul class="nav nav-tabs" id="profileTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button class="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview-tab-pane" type="button" role="tab" aria-controls="overview-tab-pane" aria-selected="true">Overview</button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Profile</button>
                    </li>

                    <li class="nav-item" role="presentation">
                      <button class="nav-link" id="password-tab" data-bs-toggle="tab" data-bs-target="#password-tab-pane" type="button" role="tab" aria-controls="password-tab-pane" aria-selected="false">Password</button>
                    </li>
                  </ul>
                  <div class="tab-content pt-4" id="profileTabContent">
                    <div class="tab-pane fade show active" id="overview-tab-pane" role="tabpanel" aria-labelledby="overview-tab" tabindex="0">
                      <h5 class="mb-3">About</h5>
                      <p class="lead mb-3">Ethan Leo is a seasoned and results-driven Project Manager who brings experience and expertise to project management. With a proven track record of successfully delivering complex projects on time and within budget, Ethan Leo is the go-to professional for organizations seeking efficient and effective project leadership.</p>
                      <h5 class="mb-3">Profile</h5>
                      <div class="row g-0">
                        <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                          <div class="p-2">First Name</div>
                        </div>
                        <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                          <div class="p-2">Ethan</div>
                        </div>
                        <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                          <div class="p-2">Last Name</div>
                        </div>
                        <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                          <div class="p-2">Leo</div>
                        </div>
                        <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                          <div class="p-2">Education</div>
                        </div>
                        <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                          <div class="p-2">M.S Computer Science</div>
                        </div>
                        <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                          <div class="p-2">Address</div>
                        </div>
                        <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                          <div class="p-2">Mountain View, California</div>
                        </div>
                        <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                          <div class="p-2">Country</div>
                        </div>
                        <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                          <div class="p-2">United States</div>
                        </div>
                        <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                          <div class="p-2">Job</div>
                        </div>
                        <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                          <div class="p-2">Project Manager</div>
                        </div>
                        <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                          <div class="p-2">Company</div>
                        </div>
                        <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                          <div class="p-2">GitHub Inc</div>
                        </div>
                        <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                          <div class="p-2">Phone</div>
                        </div>
                        <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                          <div class="p-2">+1 (248) 679-8745</div>
                        </div>
                        <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                          <div class="p-2">Email</div>
                        </div>
                        <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                          <div class="p-2">leo@example.com</div>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                      <form action="#!" class="row gy-3 gy-xxl-4">
                        <div class="col-12">
                          <div class="row gy-2">
                            <label class="col-12 form-label m-0">Profile Image</label>
                            <div class="col-12">
                              <img src="./assets/img/profile-img-1.jpg" class="img-fluid" alt="Luna John" />
                            </div>
                            <div class="col-12">
                              <a href="#!" class="d-inline-block bg-primary link-light lh-1 p-2 rounded">
                                <i class="bi bi-upload"></i>
                              </a>
                              <a href="#!" class="d-inline-block bg-danger link-light lh-1 p-2 rounded">
                                <i class="bi bi-trash"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <div class="col-12 col-md-6">
                          <label for="inputFirstName" class="form-label">First Name</label>
                          <input type="text" class="form-control" id="inputFirstName" value="raymund" />
                        </div>
                        <div class="col-12 col-md-6">
                          <label for="inputLastName" class="form-label">Last Name</label>
                          <input type="text" class="form-control" id="inputLastName" value="Leo" />
                        </div>
                        <div class="col-12 col-md-6">
                          <label for="inputEducation" class="form-label">Education</label>
                          <input type="text" class="form-control" id="inputEducation" value="M.S Computer Science" />
                        </div>
                        <div class="col-12 col-md-6">
                          <label for="inputSkills" class="form-label">Skills</label>
                          <input type="text" class="form-control" id="inputSkills" value="HTML, SCSS, Javascript, React, Vue, Angular, UI, UX" />
                        </div>
                        <div class="col-12 col-md-6">
                          <label for="inputJob" class="form-label">Job</label>
                          <input type="text" class="form-control" id="inputJob" value="Project Manager" />
                        </div>
                        <div class="col-12 col-md-6">
                          <label for="inputCompany" class="form-label">Company</label>
                          <input type="text" class="form-control" id="inputCompany" value="GitHub Inc" />
                        </div>
                        <div class="col-12 col-md-6">
                          <label for="inputPhone" class="form-label">Phone</label>
                          <input type="tel" class="form-control" id="inputPhone" value="+12486798745" />
                        </div>
                        <div class="col-12 col-md-6">
                          <label for="inputEmail" class="form-label">Email</label>
                          <input type="email" class="form-control" id="inputEmail" value="leo@example.com" />
                        </div>
                        <div class="col-12 col-md-6">
                          <label for="inputAddress" class="form-label">Address</label>
                          <input type="text" class="form-control" id="inputAddress" value="Mountain View, California" />
                        </div>
                        <div class="col-12 col-md-6">
                          <label for="inputCountry" class="form-label">Country</label>
                          <select class="form-select" id="inputCountry">
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Åland Islands">Åland Islands</option>
                            <option value="Albania">Albania</option>
                            <option value="Kenya">Kenya</option>
                          </select>
                        </div>

                        <div class="col-12">
                          <label for="inputAbout" class="form-label">About</label>
                          <textarea class="form-control" id="inputAbout">Ethan Leo is a seasoned and results-driven Project Manager who brings experience and expertise to project management. With a proven track record of successfully delivering complex projects on time and within budget, Ethan Leo is the go-to professional for organizations seeking efficient and effective project leadership.</textarea>
                        </div>
                        <div class="col-12">
                          <button type="submit" class="btn btn-primary">Save Changes</button>
                        </div>
                      </form>
                    </div>

                    <div class="tab-pane fade" id="password-tab-pane" role="tabpanel" aria-labelledby="password-tab" tabindex="0">
                      <form action="#!">
                        <div class="row gy-3 gy-xxl-4">
                          <div class="col-12">
                            <label for="currentPassword" class="form-label">Current Password</label>
                            <input type="password" class="form-control" id="currentPassword" />
                          </div>
                          <div class="col-12">
                            <label for="newPassword" class="form-label">New Password</label>
                            <input type="password" class="form-control" id="newPassword" />
                          </div>
                          <div class="col-12">
                            <label for="confirmPassword" class="form-label">Confirm Password</label>
                            <input type="password" class="form-control" id="confirmPassword" />
                          </div>
                          <div class="col-12">
                            <button type="submit" class="btn btn-primary">Change Password</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}

export default Testpage;