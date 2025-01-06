<template>
  <ion-page>
    <ion-app>
      <ion-split-pane content-id="main-content">
        <side-menu />

        <div class="ion-page" id="main-content">
          <ion-header>
            <ion-toolbar>
              <ion-buttons slot="start">
                <ion-menu-button></ion-menu-button>
              </ion-buttons>
              <ion-title>
                <div class="flex items-center">
                  <ion-icon :icon="gridOutline" class="mr-2"></ion-icon>
                  Dashboard Overview
                </div>
              </ion-title>
            </ion-toolbar>
          </ion-header>

          <ion-content class="dashboard-content">
            <ion-card class="welcome-card">
            <ion-card-header>
              <ion-card-subtitle>{{ currentDate }}</ion-card-subtitle>
              <ion-card-title>Welcome Back! </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              Your daily overview and statistics
            </ion-card-content>
          </ion-card>

            <div class="dashboard-grid">
              <ion-card class="metric-card total-staff">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="peopleOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Total Staff</h3>
                    <p>{{ totalstaffCount || 0 }}</p>
                    <div class="metric-trend positive">
                      <ion-icon :icon="trendingUpOutline"></ion-icon>
                      <span>+5% this week</span>
                    </div>
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card total-students">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="schoolOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Total Students</h3>
                    <p>{{ totalAllLeadCount || 0 }}</p>
                    <div class="metric-trend positive">
                      <ion-icon :icon="trendingUpOutline"></ion-icon>
                      <span>+12% this month</span>
                    </div>
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card counselor-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="peopleCircleOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Counselor Leads</h3>
                    <p>{{ totalCounsillerAssignedCount || 0 }}</p>
                    <div class="metric-trend positive">
                      <ion-icon :icon="trendingUpOutline"></ion-icon>
                      <span>Active Cases</span>
                    </div>
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Document Processing</h3>
                    <p>{{ totalDocumentAssignedCount || 0 }}</p>
                    <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div>
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card visa-processing">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="airplaneOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Visa Processing</h3>
                    <p>{{ totalvisaProcessingCount || 0 }}</p>
                    <div class="metric-trend warning">
                      <ion-icon :icon="hourglassOutline"></ion-icon>
                      <span>Pending</span>
                    </div>
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card visa-status">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Visa Rejected</h3>
                    <p>{{ totalvisaRejectedCount || 0 }}</p>
                    <div class="metric-trend negative">
                      <ion-icon :icon="alertCircleOutline"></ion-icon>
                      <span>Needs Review</span>
                    </div>
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Application Not Processed</h3>
                    <p>{{ totalApplicationNotProcessedLeadCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Application Ok For Processing</h3>
                    <p>{{ totalApplicationOkForProcessingLeadCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Application Processed</h3>
                    <p>{{ totalApplicationProcessedLeadCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Application Recieved</h3>
                    <p>{{ totalApplicationRecievedLeadCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Case Closed</h3>
                    <p>{{ totalCaseClosedCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Document Pending</h3>
                    <p>{{ totalDocumentPendingCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Conditional Offer Issued</h3>
                    <p>{{ totalConditionalOfferIssuedCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Unconditional Offer</h3>
                    <p>{{ totalUnconditionalOfferCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Cas Issued</h3>
                    <p>{{ totalCasIssuedCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Cas Doc Waiting Ed</h3>
                    <p>{{ totalCasDocWaitingEdCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Interview Results Waiting</h3>
                    <p>{{ totalInterviewResultsWaitingCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Interview Scheduled</h3>
                    <p>{{ totalInterviewScheduledCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Visa Process</h3>
                    <p>{{ totalVisaProcessCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Visa Filed</h3>
                    <p>{{ totalVisaFiledCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Visa Recieved</h3>
                    <p>{{ totalVisaRecievedCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>total Completed</h3>
                    <p>{{ totalCompletedCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Documents Pending</h3>
                    <p>{{ totalDocumentsPendingLeadCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Complete Documentation Recieved</h3>
                    <p>{{ totalCompleteDocumentationRecievedLeadCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>


              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>SOP Creating</h3>
                    <p>{{ totalSOPCreatingLeadCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Move To Application</h3>
                    <p>{{ totalMoveToApplicationLeadCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>
            </div>

            <!-- Dropdown Section -->
            <ion-col size="6" size-md="6">
              <ion-item>
                <ion-label>Select staf</ion-label>
                <ion-select placeholder="Choose One" @ionChange="handleDropdownChange" v-model="selectedOption">
                  <ion-select-option value="counsillerList">Counselor List</ion-select-option>
                  <ion-select-option value="documentList">Document List</ion-select-option>
                  <ion-select-option value="applicationList">Application List</ion-select-option>
                </ion-select>
              </ion-item>
              <div v-if="selectedList.length" class="dropdown-result">
                <div v-for="(item, index) in selectedList" :key="index" class="user-item" @click="showLeads(item)">
                  <ion-item button>
                    <ion-avatar slot="start">
                      <img
                        src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png"
                        alt="User Avatar" />
                    </ion-avatar>
                    <ion-label>
                      <h2>{{ item.username }}</h2>
                    </ion-label>
                  </ion-item>
                </div>
              </div>
              <!-- Leads Section -->
              <div v-if="leadsForUser">
                <h3>Leads for {{ leadsForUser.username }}</h3>

                <div class="lead-type-options">
                  <ion-button @click="fetchLeadType('Registered')" color="primary">Registered</ion-button>
                  <ion-button @click="fetchLeadType('Followup')" color="secondary">Followup</ion-button>
                </div>

                <div v-if="selectedLeadType === 'Registered' && leadsList.length">
                  <h4>Registered Leads</h4>
                  <div v-for="lead in leadsList" :key="lead.id" class="leads-list">
                    <ion-card>
                      <ion-item>
                        <ion-avatar slot="start">
                          <img
                            src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png"
                            alt="Lead Avatar" />
                        </ion-avatar>
                        <ion-label>
                          <h2>{{ lead.student_name }}</h2>
                          <span class="status-badge"
                            :class="lead.counsiller && lead.counsiller.status_name ? lead.counsiller.status_name.toLowerCase() : 'pending'">
                            {{ lead.counsiller && lead.counsiller.status_name ? lead.counsiller.status_name : 'Pending'
                            }}
                          </span>
                          <div class="info-grid">
                            <div class="info-item">
                              <ion-icon :icon="callOutline" class="info-icon"></ion-icon>
                              <span>{{ lead.mobile }}</span>
                              <ion-icon :icon="timeOutline" class="info-icon"></ion-icon>
                              <span>{{ formatDate(lead.date) }}</span>
                              <ion-icon :icon="globeOutline" class="info-icon"></ion-icon>
                              <span>{{ lead.country }}</span>
                            </div>
                          </div>
                        </ion-label>
                        <div class="action-buttons">
                          <ion-button fill="clear" size="small" @click="openUpdateModal(lead.id)">
                            <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
                          </ion-button>
                          <ion-button fill="clear" slot="end" @click.stop="viewLeadDetails(lead)">
                            <ion-icon :icon="eyeOutline" class="view-icon"></ion-icon>
                          </ion-button>
                        </div>
                      </ion-item>
                    </ion-card>
                  </div>
                </div>

                <div v-if="selectedLeadType === 'Followup' && leadsList.length">
                  <h4>Followup Leads</h4>
                  <div v-for="lead in leadsList" :key="lead.id" class="leads-list">
                    <ion-card>
                      <ion-item>
                        <ion-avatar slot="start">
                          <img
                            src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png"
                            alt="Lead Avatar" />
                        </ion-avatar>
                        <ion-label>
                          <h2>{{ lead.student_name }}</h2>
                          <span class="status-badge"
                            :class="lead.counsiller && lead.counsiller.status_name ? lead.counsiller.status_name.toLowerCase() : 'pending'">
                            {{ lead.counsiller && lead.counsiller.status_name ? lead.counsiller.status_name : 'Pending'
                            }}
                          </span>
                          <div class="info-grid">
                            <div class="info-item">
                              <ion-icon :icon="callOutline" class="info-icon"></ion-icon>
                              <span>{{ lead.mobile }}</span>
                              <ion-icon :icon="timeOutline" class="info-icon"></ion-icon>
                              <span>{{ formatDate(lead.date) }}</span>
                              <ion-icon :icon="globeOutline" class="info-icon"></ion-icon>
                              <span>{{ lead.country }}</span>
                            </div>
                          </div>
                        </ion-label>
                        <div class="action-buttons">
                          <ion-button fill="clear" slot="end" @click.stop="openUpdateModal(lead.id)">
                            <ion-icon :icon="createOutline" class="edit-icon"></ion-icon>
                          </ion-button>

                          <ion-button fill="clear" slot="end" @click.stop="viewLeadDetails(lead)">
                            <ion-icon :icon="eyeOutline" class="view-icon"></ion-icon>
                          </ion-button>
                        </div>
                      </ion-item>
                    </ion-card>
                  </div>
                </div>
              </div>
            </ion-col>

            <!-- Update Modal -->
            <ion-modal :isOpen="showUpdate" @didDismiss="showUpdate = false" class="update-modal" full-screen
              css-class="">
              <ion-header>
                <ion-toolbar class="modal-toolbar">
                  <ion-grid>
                    <ion-row class="ion-align-items-center">
                      <ion-col size="auto">
                        <ion-button class="back-button" fill="clear" @click="closeUpdateModal">
                          <ion-icon :icon="chevronBackOutline"></ion-icon>
                        </ion-button>
                      </ion-col>
                      <ion-col>
                        <ion-title class="modal-title">Update Lead</ion-title>
                      </ion-col>
                    </ion-row>
                  </ion-grid>
                </ion-toolbar>
              </ion-header>
              <ion-content>
                <form class="update-form">
                  <ion-input v-model="date" label="Date" type="date" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="name" label="Name" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="mobile" label="Mobile" type="tel" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="address" label="Address" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="country" label="Country" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="source" label="Lead Source" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <div class="remarks-section">
                    <h4 class="section-title">Remarks</h4>
                    <ul v-if="totalremarkListId.rows && totalremarkListId.rows.length > 0">
                      <li v-for="remark in totalremarkListId.rows" :key="remark.id">
                        <p>{{ remark.remark }}</p>
                        <small>{{ remark.remark_date
                          ? new Date(remark.remark_date).toISOString().split("T")[0]
                          : null }}</small>
                        <ion-button fill="clear" @click="editRemark(remark)">Edit</ion-button>
                        <ion-button fill="clear" color="danger" @click="deleteRemark(remark.id)">
                          Delete
                        </ion-button>
                      </li>
                    </ul>
                    <ion-input v-model="newRemark" label="Add or Update Remark" type="text" labelPlacement="floating"
                      fill="solid" class="form-input"></ion-input>
                    <ion-input v-model="remarkDate" label="Remark Date" type="date" labelPlacement="floating"
                      fill="solid" class="form-input"></ion-input>
                    <ion-button @click="saveRemark">Save Remark</ion-button>
                  </div>
                  <!-- <ion-input v-model="Remark" label="Remark" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-if="requiresRemark" v-model="newRemarkDate" label="remark Date" type="date"
                    labelPlacement="floating" fill="solid" class="form-input"></ion-input> -->
                  <ion-input v-model="university" label="university" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="course" label="course" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <!-- <ion-select v-model="priorityId" label="counsiller Status" labelPlacement="floating" fill="solid"
                    class="form-select">
                    <ion-select-option v-for="status in totalStatusList" :key="status.id" :value="status.id">
                      {{ status.status_name }}
                    </ion-select-option>
                  </ion-select> -->

                  <div class="marks-section">
                    <h4 class="section-title">Academic Details</h4>
                    <ion-input v-model="tenth" label="10th Mark" type="number" labelPlacement="floating" fill="solid"
                      class="form-input"></ion-input>
                    <ion-input v-model="twelth" label="12th Mark" type="number" labelPlacement="floating" fill="solid"
                      class="form-input"></ion-input>
                    <ion-input v-model="degree" label="Degree Mark" type="number" labelPlacement="floating" fill="solid"
                      class="form-input"></ion-input>
                    <ion-input v-model="pg" label="PG Mark" type="number" labelPlacement="floating" fill="solid"
                      class="form-input"></ion-input>
                    <ion-input v-model="ielts" label="IELTS Score" type="number" labelPlacement="floating" fill="solid"
                      class="form-input"></ion-input>
                  </div>

                  <div class="experience-section">
                    <h4 class="section-title">Experience Details</h4>
                    <ion-input v-model="year" label="Years of Experience" type="number" labelPlacement="floating"
                      fill="solid" class="form-input"></ion-input>
                    <ion-input v-model="field" label="Field of Experience" type="text" labelPlacement="floating"
                      fill="solid" class="form-input"></ion-input>
                  </div>

                  <ion-select v-model="counsillerId" label="Counsiller Status" labelPlacement="floating" fill="solid"
                    class="form-select">
                    <ion-select-option v-for="status in totalCounsillerList" :key="status.id" :value="status.id">
                      {{ status.status_name }}
                    </ion-select-option>
                  </ion-select>

                  <ion-input v-if="requiresFollowUpDate" v-model="followUpDate" label="Follow-up Date" type="date"
                    labelPlacement="floating" fill="solid" class="form-input"></ion-input>

                  <ion-select v-model="documentId" label="Document Status" fill="solid" placeholder="Select status">
                    <ion-select-option v-for="status in totalDocumentList" :key="status.id" :value="status.id">
                      {{ status.status_name }}
                    </ion-select-option>
                  </ion-select>

                  <ion-input v-if="requiresDocFollowUpDate" v-model="newfollowUpDate" label="Document Follow-up Date"
                    type="date" labelPlacement="floating" fill="solid" class="form-input"></ion-input>

                  <ion-select v-model="applicationId" label="Application Status" fill="solid" placeholder="Select status">
                    <ion-select-option v-for="status in totalApplicationList" :key="status.id" :value="status.id">
                      {{ status.status_name }}
                    </ion-select-option>
                  </ion-select>

                  <ion-input v-if="requiresAppFollowUpDate" v-model="AppfollowUpDate"
                    label=" Application Follow-up Date" type="date" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>

                  <ion-select v-model="DocumentStatusId" label="Documentation Status" fill="solid"
                    placeholder="Select Document Status">
                    <ion-select-option v-for="status in totalDocumentStatusList" :key="status.id" :value="status.id">
                      {{ status.status_name }}
                    </ion-select-option>
                  </ion-select>

                  <ion-select v-model="studentStatusId" label="Student Status" fill="solid" placeholder="Select status">
                    <ion-select-option v-for="status in totalstatusList" :key="status.id" :value="status.id">
                      {{ status.status_name }}
                    </ion-select-option>
                  </ion-select>

                  <ion-select v-model="document" label="Document Staff" labelPlacement="floating" fill="solid"
                    class="form-select">
                    <ion-select-option v-for="status in totaldocumentList" :key="status.id" :value="status.id">
                      {{ status.username }}
                    </ion-select-option>
                  </ion-select>

                  <ion-select v-model="application" label="Application Staff" fill="solid" placeholder="Select staff">
                    <ion-select-option v-for="status in totalapplicationList" :key="status.id" :value="status.id">
                      {{ status.username }}
                    </ion-select-option>
                  </ion-select>

                  <ion-button expand="block" class="save-button" @click="updateLead">
                    <ion-icon :icon="saveOutline" slot="start"></ion-icon>
                    Save Changes
                  </ion-button>

                  <div class="experience-section">
                    <h4 class="section-title">UPLOAD DOCUMENTS</h4>
                    <ion-button fill="clear" class="action-btn delete" @click="deletedocuments()">
                      <ion-icon :icon="trash"></ion-icon>
                    </ion-button>
                    <ion-input v-model="pass_no" label="Passport no" type="text" labelPlacement="floating" fill="solid"
                      class="form-input"></ion-input>
                    <ion-input v-model="aadhar_no" label="Aadhar no" type="text" labelPlacement="floating" fill="solid"
                      class="form-input"></ion-input>
                    <ion-input v-model="pan_no" label="Pan no" type="text" labelPlacement="floating" fill="solid"
                      class="form-input"></ion-input>

                    <div class="document-upload-section">
                      <!-- Passport -->
                      <div class="document-item">
                        <ion-button @click="triggerPassportInput" class="profile" fill="clear">
                          {{ passimages.length ? 'Update Passport' : 'Upload Passport' }}
                        </ion-button>
                        <input type="file" ref="passportInput" @change="onPassportChange" hidden multiple
                          accept="image/*">
                        <div class="preview-container" v-if="passimages?.length">
                          <div v-for="(image, index) in passimages" :key="index" class="preview-wrapper">
                            <img :src="image.url || image" alt="Passport Image" class="preview-image">
                            <ion-button v-if="!isExistingImage(image, 'passport')"
                              @click="removeImage('passport', index)" fill="clear" class="remove-button">
                              <ion-icon :icon="trash"></ion-icon>
                            </ion-button>
                          </div>
                          <!-- Existing delete all button logic remains the same -->
                          <ion-button v-if="hasExistingPassportImages" @click="removeAllpassImages()" fill="clear"
                            class="remove-all-button">
                            <ion-icon :icon="trash"></ion-icon>
                            Delete All Passport Images
                          </ion-button>
                        </div>
                      </div>

                      <!-- Aadhar -->
                      <div class="document-item">
                        <ion-button @click="triggerAadharInput" class="profile" fill="clear">
                          {{ aadharimages.length ? 'Update Aadhar' : 'Upload Aadhar' }}
                        </ion-button>
                        <input type="file" ref="aadharInput" @change="onAadharChange" hidden multiple accept="image/*">
                        <div class="preview-container" v-if="aadharimages?.length">
                          <div v-for="(image, index) in aadharimages" :key="index" class="preview-wrapper">
                            <img :src="image.url || image" alt="Aadhar Image" class="preview-image">
                            <ion-button v-if="!isExistingImage(image, 'aadhar')" @click="removeImage('aadhar', index)"
                              fill="clear" class="remove-button">
                              <ion-icon :icon="trash"></ion-icon>
                            </ion-button>
                          </div>
                          <!-- Existing delete all button logic remains the same -->
                          <ion-button v-if="hasExistingAadharImages" @click="removeAllaadImages()" fill="clear"
                            class="remove-all-button">
                            <ion-icon :icon="trash"></ion-icon>
                            Delete All Aadhar Images
                          </ion-button>
                        </div>
                      </div>

                      <!-- Pan -->
                      <div class="document-item">
                        <ion-button @click="triggerPanInput" class="profile" fill="clear">
                          {{ panimages.length ? 'Update Pan' : 'Upload Pan' }}
                        </ion-button>
                        <input type="file" ref="panInput" @change="onPanChange" hidden multiple accept="image/*">
                        <div class="preview-container" v-if="panimages?.length">
                          <div v-for="(image, index) in panimages" :key="index" class="preview-wrapper">
                            <img :src="image.url || image" alt="Pan Image" class="preview-image">
                            <ion-button v-if="!isExistingImage(image, 'pan')" @click="removeImage('pan', index)"
                              fill="clear" class="remove-button">
                              <ion-icon :icon="trash"></ion-icon>
                            </ion-button>
                          </div>
                          <!-- Existing delete all button logic remains the same -->
                          <ion-button v-if="hasExistingPanImages" @click="removeAllpanImages()" fill="clear"
                            class="remove-all-button">
                            <ion-icon :icon="trash"></ion-icon>
                            Delete All Pan Images
                          </ion-button>
                        </div>
                      </div>
                    </div>

                    <!-- Error message -->
                    <div v-if="errorMessage" class="error-message">
                      {{ errorMessage }}
                    </div>

                    <!-- Upload/Update button -->
                    <ion-button expand="block" class="save-button" @click="addOrUpdateUpload">
                      <ion-icon :icon="saveOutline" slot="start"></ion-icon>
                      {{ hasExistingDocuments ? 'Update Documents' : 'Upload Documents' }}
                    </ion-button>
                  </div>
                </form>
              </ion-content>
            </ion-modal>

            <ion-modal :is-open="showViewModals" @didDismiss="closeViewModal" class="view-modal">
              <ion-header>
                <ion-toolbar>
                  <ion-title>Lead Details</ion-title>
                  <ion-buttons slot="end">
                    <ion-button @click="closeViewModal">
                      <ion-icon :icon="closeOutline"></ion-icon>
                    </ion-button>
                  </ion-buttons>
                </ion-toolbar>
              </ion-header>

              <ion-content class="ion-padding">
                <div class="details-container">
                  <div class="detail-section">
                    <h3 class="section-title">Personal Information</h3>
                    <ion-item>
                      <ion-label>
                        <h2>Name</h2>
                        <p>{{ selectedLead?.student_name }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Mobile</h2>
                        <p>{{ selectedLead?.mobile }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Address</h2>
                        <p>{{ selectedLead?.address }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Country</h2>
                        <p>{{ selectedLead?.country }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Lead Source</h2>
                        <p>{{ selectedLead?.lead_source }}</p>
                      </ion-label>
                    </ion-item>
                  </div>

                  <div class="detail-section">
                    <h3 class="section-title">Academic Details</h3>
                    <ion-item>
                      <ion-label>
                        <h2>10th Mark</h2>
                        <p>{{ selectedLead?.mark_tenth || 'Not provided' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>12th Mark</h2>
                        <p>{{ selectedLead?.mark_twelth || 'Not provided' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Degree Mark</h2>
                        <p>{{ selectedLead?.mark_degree || 'Not provided' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>PG Mark</h2>
                        <p>{{ selectedLead?.mark_pg || 'Not provided' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>IELTS Score</h2>
                        <p>{{ selectedLead?.mark_ielts || 'Not provided' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Course</h2>
                        <p>{{ selectedLead?.course || 'Not provided' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>university</h2>
                        <p>{{ selectedLead?.university || 'Not provided' }}</p>
                      </ion-label>
                    </ion-item>
                  </div>

                  <div class="detail-section">
                    <h3 class="section-title">Experience Details</h3>
                    <ion-item>
                      <ion-label>
                        <h2>Years of Experience</h2>
                        <p>{{ selectedLead?.experience_year || 'Not provided' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Field of Experience</h2>
                        <p>{{ selectedLead?.experience_field || 'Not provided' }}</p>
                      </ion-label>
                    </ion-item>
                  </div>

                  <div class="detail-section">
                    <h3 class="section-title">Status Information</h3>
                    <ion-item>
                      <ion-label>
                        <h2>Counsiller Status</h2>
                        <p>{{ selectedLead?.counsiller?.status_name || 'Pending' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item v-if="selectedLead?.followup_date">
                      <ion-label>
                        <h2>Follow-up Date</h2>
                        <p>{{ formatDate(selectedLead.followup_date) }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Documentation Status</h2>
                        <p>{{ selectedLead?.document?.status_name || 'Pending' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item v-if="selectedLead?.followup_documentdate">
                      <ion-label>
                        <h2>Document Follow-up Date</h2>
                        <p>{{ formatDate(selectedLead.followup_documentdate) }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Application Status</h2>
                        <p>{{ selectedLead?.application?.status_name || 'Pending' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item v-if="selectedLead?.followup_applicationdate">
                      <ion-label>
                        <h2>Application Follow-up Date</h2>
                        <p>{{ formatDate(selectedLead.followup_applicationdate) }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Assigned To Counsiller</h2>
                        <p>{{ selectedLead?.counsill?.username || 'Not assigned' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item></ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Assigned To Document</h2>
                        <p>{{ selectedLead?.documentation?.username || 'Not assigned' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Assigned To Application</h2>
                        <p>{{ selectedLead?.applicat?.username || 'Not assigned' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Student Status</h2>
                        <p>{{ selectedLead?.student_status?.status_name || 'Not assigned' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Document Status</h2>
                        <p>{{ selectedLead?.document_status?.status_name || 'Not assigned' }}</p>
                      </ion-label>
                    </ion-item>
                  </div>
                  <div class="detail-section">
                    <h4 class="section-title">Remarks</h4>
                    <ul v-if="totalremarkListId.rows && totalremarkListId.rows.length > 0">
                      <li v-for="remark in totalremarkListId.rows" :key="remark.id">
                        <p>{{ remark.remark }}</p>
                        <small>{{ remark.remark_date
                          ? new Date(remark.remark_date).toISOString().split("T")[0]
                          : null }}</small>
                      </li>
                    </ul>
                  </div>
                  <div class="detail-section">
                    <h4 class="section-title">UPLOADED DOCUMENTS</h4>
                    <ion-input v-model="pass_no" label="Passport no" type="text" labelPlacement="floating" fill="solid"
                      class="form-input" readonly></ion-input>
                    <ion-input v-model="aadhar_no" label="Aadhar no" type="text" labelPlacement="floating" fill="solid"
                      class="form-input" readonly></ion-input>
                    <ion-input v-model="pan_no" label="Pan no" type="text" labelPlacement="floating" fill="solid"
                      class="form-input" readonly></ion-input>

                    <!-- Passport -->
                    <div class="document-item">
                      <ion-label class="image-label">Passport Images</ion-label>
                      <div class="preview-container" v-if="passimages?.length">
                        <div v-for="(image, index) in passimages" :key="index" class="preview-wrapper">
                          <img :src="image.url || image" alt="Passport Image" class="preview-image">
                        </div>
                      </div>
                    </div>

                    <!-- Aadhar -->
                    <div class="document-item">
                      <ion-label class="image-label">Aadhar Images</ion-label>
                      <div class="preview-container" v-if="aadharimages?.length">
                        <div v-for="(image, index) in aadharimages" :key="index" class="preview-wrapper">
                          <img :src="image.url || image" alt="Aadhar Image" class="preview-image">
                        </div>
                      </div>
                    </div>

                    <!-- Pan -->
                    <div class="document-item">
                      <ion-label class="image-label">Pan Images</ion-label>
                      <div class="preview-container" v-if="panimages?.length">
                        <div v-for="(image, index) in panimages" :key="index" class="preview-wrapper">
                          <img :src="image.url || image" alt="Pan Image" class="preview-image">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ion-content>
            </ion-modal>

            <!-- Delete Confirmation Modal -->
            <ion-modal :is-open="showDelete" @didDismiss="closeDeleteDialog" class="delete-modal">
              <ion-header>
                <ion-toolbar class="modal-toolbar">
                  <ion-title>Confirm Delete</ion-title>
                  <ion-buttons slot="end">
                    <ion-button @click="closeDeleteDialog">
                      <ion-icon :icon="closeOutline"></ion-icon>
                    </ion-button>
                  </ion-buttons>
                </ion-toolbar>
              </ion-header>
              <ion-content class="ion-padding">
                <div class="delete-content">
                  <ion-icon :icon="warningOutline" class="warning-icon"></ion-icon>
                  <h2>Delete Lead?</h2>
                  <p>Are you sure you want to delete this lead? This action cannot be undone.</p>
                  <div class="delete-actions">
                    <ion-button color="medium" expand="block" @click="closeDeleteDialog">Cancel</ion-button>
                    <ion-button color="danger" expand="block" @click="confirmdelete">
                      <ion-icon :icon="trash" slot="start"></ion-icon>
                      Delete
                    </ion-button>
                  </div>
                </div>
              </ion-content>
            </ion-modal>

          </ion-content>
        </div>
      </ion-split-pane>
    </ion-app>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';
import {
  IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonMenuButton, IonSplitPane, IonIcon,
  IonPage, IonCard, IonRippleEffect, IonCol, IonItem, IonSelect,
  IonSelectOption, IonLabel, IonButton, IonAvatar, IonModal,
  IonInput, IonGrid, IonRow,
} from '@ionic/vue';
import {
  peopleOutline, schoolOutline, documentTextOutline,
  airplaneOutline, checkmarkCircleOutline, alertCircleOutline,
  peopleCircleOutline, gridOutline, trendingUpOutline,
  timeOutline, hourglassOutline, eyeOutline, callOutline,
  createOutline, globeOutline, trash, saveOutline, warningOutline,
  closeOutline, chevronBackOutline
} from 'ionicons/icons';
import SideMenu from '@/components/SideMenu.vue';

export default defineComponent({
  name: 'DashboardComponent',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonMenuButton, IonSplitPane, IonIcon,
    IonPage, IonCard, IonRippleEffect, SideMenu,
    IonCol, IonItem, IonSelect, IonAvatar,
    IonSelectOption, IonLabel, IonButton, IonModal,
    IonInput, IonGrid, IonRow,
  },
  data() {
    return {
      showViewModals: false, // Add this
      selectedLead: null,    // Add this
      showUpdate: false,
      newRemark: '',
      university: '',
      course: '',
      remarkDate: "",
      Remark: '',
      remarkId: null,
      newRemarkDate: '',
      editingRemarkId: null,
      isAddingRemark: false,
      DocumentStatusId: null,
      name: '',
      mobile: '',
      address: '',
      country: '',
      source: '',
      tenth: '',
      twelth: '',
      // panimage: '',
      pan_no: '',
      aadhar_no: '',
      pass_no: '',
      passimages: [], // Array of {file, url} objects
      aadharimages: [], // Array of {file, url} objects
      panimages: [], // Array of {file, url} objects
      deleteItem: {},
      imageFile: null,
      imageFile1: null,
      imageFile2: null,
      degree: '',
      pg: '',
      ielts: '',
      year: '',
      field: '',
      showDelete: false,
      counsillerId: null,
      priorityId: null,
      document: null,
      currentleadId: null,
      currentDocumentId: null,
      existingPassportUrl: '',
      existingAadharUrl: '',
      existingPanUrl: '',
      documentsLoaded: false,
      DocumentStatusId: null,
      documentId: null,
      applicationId: null,
      application: null,
      studentStatusId: null,
      followUpDate: null,
      newfollowUpDate: null,
      AppfollowUpDate: null,
      errorMessage: '',
      selectedOption: '',
      leadsForUser: null,
      selectedLeadType: '', // Tracks selected lead type (Registered or Followup)
      leadsList: [],
      currentModule: '',
      peopleOutline, schoolOutline, documentTextOutline,
      airplaneOutline, checkmarkCircleOutline, alertCircleOutline,
      peopleCircleOutline, gridOutline, trendingUpOutline,
      timeOutline, hourglassOutline, eyeOutline, callOutline,
      createOutline, globeOutline, trash, saveOutline, warningOutline,
      closeOutline, chevronBackOutline
    };
  },
  computed: {
    ...mapState('addLead', [
      'totalAllLeadCount', 'totalvisaRejectedCount',
      'totalvisaProcessingCount', 'totalCounsillerAssignedCount',
      'totalDocumentAssignedCount', 'totalApplicationAssignedCount',
      'totalApplicationNotProcessedLeadCount',
      'totalApplicationOkForProcessingLeadCount',
      'totalApplicationProcessedLeadCount',
      'totalApplicationRecievedLeadCount',
      'totalCaseClosedCount',
      'totalDocumentPendingCount',
      'totalConditionalOfferIssuedCount',
      'totalUnconditionalOfferCount',
      'totalCasIssuedCount',
      'totalCasDocWaitingEdCount',
      'totalInterviewResultsWaitingCount',
      'totalInterviewScheduledCount',
      'totalVisaProcessCount',
      'totalVisaFiledCount',
      'totalVisaRecievedCount',
      'totalCompletedCount',
      'totalDocumentsPendingLeadCount',
      'totalCompleteDocumentationRecievedLeadCount',
      'totalSOPCreatingLeadCount',
      'totalMoveToApplicationLeadCount',
    ]),
    ...mapState('user', ['totalstaffCount', 'totalcounsillerList', 'totaldocumentList', 'totalapplicationList']),
    ...mapState('counsiller', ['totalregisteredListId', 'totalfollowupListId', 'totalDocumentStatusList', 'totalCounsillerList', 'totaluploadListId', 'totalStatusList', 'totalremarkListId']),
    ...mapState('document', ['totalregisteredListId', 'totalfollowupListId', 'totalDocumentList', 'totalremarkListId', 'totalDocumentStatusList']),
    ...mapState('application', ['totalregisterdListId', 'totalfollowupListId', 'totalApplicationList', 'totalstatusList', 'totalremarkListId']),

    selectedList() {
      if (this.selectedOption === 'counsillerList') {
        this.currentModule = 'counsiller';
        return this.totalcounsillerList;
      } else if (this.selectedOption === 'documentList') {
        this.currentModule = 'document';
        return this.totaldocumentList;
      } else if (this.selectedOption === 'applicationList') {
        this.currentModule = 'application';
        return this.totalapplicationList;
      }
      return [];
    },
    hasExistingDocuments() {
      return this.currentDocumentId !== null;
    },
    hasExistingPassportImages() {
      // Check if passport images are from the database (have a URL that doesn't start with blob)
      return this.passimages.some(image => image.url && !image.url.startsWith('blob:'));
    },
    hasExistingAadharImages() {
      return this.aadharimages.some(image => image.url && !image.url.startsWith('blob:'));
    },
    hasExistingPanImages() {
      return this.panimages.some(image => image.url && !image.url.startsWith('blob:'));
    },
    requiresFollowUpDate() {
      const specificCounselorId = 2;
      return this.counsillerId === specificCounselorId;
    },
    requiresDocFollowUpDate() {
      const specificDocumentId = 2;
      return this.documentId === specificDocumentId;
    },
    requiresAppFollowUpDate() {
      const specificDocumentId = 2;
      return this.applicationId === specificDocumentId;
    },
  },
  methods: {
    ...mapActions('addLead', [
      'fetchtotalAllleadCount', 'fetchtotalVisaprocessingCount',
      'fetchtotalVisaRejectedCount', 'fetchtotalCounsillerAssignedCount',
      'fetchtotalDocumentAssignedCount', 'fetchtotalApplicationAssignedCount',
      'fetchtotalApplicationNotProcessedLeadCount',
      'fetchtotalApplicationOkForProcessingLeadCount',
      'fetchtotalApplicationProcessedLeadCount',
      'fetchtotalApplicationRecievedLeadCount',
      'fetchtotalCaseClosedCount',
      'fetchtotalDocumentPendingCount',
      'fetchtotalConditionalOfferIssuedCount',
      'fetchtotalUnconditionalOfferCount',
      'fetchtotalCasIssuedCount',
      'fetchtotalCasDocWaitingEdCount',
      'fetchtotalInterviewResultsWaitingCount',
      'fetchtotalInterviewScheduledCount',
      'fetchtotalVisaProcessCount',
      'fetchtotalVisaFiledCount',
      'fetchtotalVisaRecievedCount',
      'fetchtotalCompletedCount',
      'fetchtotalDocumentsPendingLeadCount',
      'fetchtotalCompleteDocumentationRecievedLeadCount',
      'fetchtotalSOPCreatingLeadCount',
      'fetchtotalMoveToApplicationLeadCount',
    ]),
    ...mapActions('user', ['fetchtotalstaffCount', 'fetchtotalcounsillerlist', 'fetchtotaldocumentlist', 'fetchtotalapplicationlist']),
    ...mapActions('counsiller', ['fetchtotalregisteredlistId', 'fetchtotalfollowuplistId', 'fetchtotalCounsillerlist', 'update_lead', 'delete_leads', 'fetchtotalDocuumentstatuslist',
      'ADD_UPLOAD', 'UPDATE_UPLOAD', 'FETCH_DOCUMENTS', 'delete_passport', 'delete_documents',
      'delete_aadhar', 'delete_pan', 'fetchtotalstatuslist', 'fetchtotalremarkListId', 'update_remark', 'Add_remark', 'delete_remark',]),
    ...mapActions('document', ['fetchtotalregisteredlistId', 'fetchtotalfollowuplistId', 'fetchtotalDocuumentstatuslist', 'fetchtotalDocumentlist', 'update_lead',
      'delete_leads', 'fetchtotalremarkListId', 'Add_remark', 'update_remark', 'delete_remark',]),
    ...mapActions('application', ['fetchtotalregisteredlistId', 'fetchtotalfollowuplistId', 'fetchtotalApplicationlist',
      'fetchtotalstatuslist',
      'update_lead',
      'delete_leads',
      'fetchtotalremarkListId', 'Add_remark', 'update_remark', 'delete_remark',]),

    async handleDropdownChange(event) {
      const selected = event.detail.value;
      this.selectedOption = selected;
      this.leadsForUser = null;
      this.selectedLeadType = '';
      this.leadsList = [];

      if (selected === 'counsillerList') {
        await this.fetchtotalcounsillerlist();
      } else if (selected === 'documentList') {
        await this.fetchtotaldocumentlist();
      } else if (selected === 'applicationList') {
        await this.fetchtotalapplicationlist();
      }
    },
    showLeads(item) {
      this.leadsForUser = item;
      this.selectedLeadType = ''; // Reset the lead type
      this.leadsList = []; // Clear the leads list
    },
    
    async fetchLeadType(type) {
      if (!this.leadsForUser || !this.currentModule) {
        console.error('No user or module selected.');
        return;
      }

      try {
        this.selectedLeadType = type;

        // Get the appropriate Vuex module's action based on currentModule
        const action = type === 'Registered'
          ? `${this.currentModule}/fetchtotalregisteredlistId`
          : `${this.currentModule}/fetchtotalfollowuplistId`;

        // Call the appropriate action using dispatch
        const leads = await this.$store.dispatch(action, this.leadsForUser.id);
        this.leadsList = leads.rows || [];

      } catch (error) {
        console.error(`Error fetching ${type} leads for ${this.currentModule}:`, error);
      }
    },
    formatDate(dateString) {
      if (!dateString) return '';

      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) return dateString;

      // Format: "15 Dec 2023"
      const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      };

      return date.toLocaleDateString('en-US', options);
    },
    async viewLeadDetails(lead) {
      try {
        this.selectedLead = lead;
        this.showViewModals = true; // Open modal

        // Fetch remarks for the lead
        const remarkDataResponse = await this.fetchtotalremarkListId(lead.id);
        if (remarkDataResponse && remarkDataResponse.rows) {
          this.totalremarkListId = remarkDataResponse; // Set remarks list
        } else {
          this.totalremarkListId = { rows: [] }; // Default to empty if no remarks found
        }

        // Fetch documents for the lead
        await this.fetchDocuments(lead.id); // Ensure fetch completes

      } catch (error) {
        console.error('Error fetching lead details:', error);
        this.errorMessage = 'Failed to load lead details.';
      }
    },
    closeViewModal() {
      this.showViewModals = false;
      this.selectedLead = null;
      this.passimages = [];
      this.aadharimages = [];
      this.panimages = [];
      this.pass_no = null;
      this.aadhar_no = null;
      this.pan_no = null;
    },
    closeUpdateModal() {
      this.showUpdate = false;
      // this.currentleadId = null,
      this.passimages = [];
      this.aadharimages = [];
      this.panimages = [];
      this.pass_no = null;
      this.aadhar_no = null;
      this.pan_no = null;
    },
    closeModalAndRefresh() {
      // Close the modal
      this.showUpdate = false;
      window.location.reload();
    },
    triggerPassportInput() {
      this.$refs.passportInput.click();
    },
    handleSearch(event) {
      this.searchQuery = event.target.value;
    },
    isExistingImage(image, type) {
      // Check if the image is from the database (has a URL that doesn't start with blob)
      return image.url && !image.url.startsWith('blob:');
    },
    onPassportChange(event) {
      const files = Array.from(event.target.files);
      if (files.length) {
        this.passimages = files.map(file => ({
          file: file,
          url: URL.createObjectURL(file)
        }));
      }
    },
    triggerAadharInput() {
      this.$refs.aadharInput.click();
    },
    onAadharChange(event) {
      const files = Array.from(event.target.files);
      if (files.length) {
        this.aadharimages = files.map(file => ({
          file: file,
          url: URL.createObjectURL(file)
        }));
      }
    },
    triggerPanInput() {
      this.$refs.panInput.click();
    },
    onPanChange(event) {
      const files = Array.from(event.target.files);
      if (files.length) {
        this.panimages = files.map(file => ({
          file: file,
          url: URL.createObjectURL(file)
        }));
      }
    },
    async removeAllpassImages() {

      const isConfirmed = confirm('Are you sure you want to delete all passport images?');

      if (isConfirmed) {
        try {
          // Check if there's an existing document ID
          if (this.currentDocumentId) {
            try {
              // Call Vuex action to delete passport images
              await this.delete_passport({ id: this.currentDocumentId });

              // Clear local image arrays and URLs
              this.passimages = [];
              this.existingPassportUrl = '';

              // Optional: Simple alert for success
              alert('Passport images deleted successfully');
            } catch (error) {
              console.error('Error deleting passport images:', error);
              alert('Failed to delete passport images');
            }
          } else {
            // If no document ID, just clear local images
            this.passimages = [];
          }
        } catch (error) {
          console.error('Error in removeAllImages:', error);
        }
      }

    },
    async removeAllaadImages() {

      const isConfirmed = confirm('Are you sure you want to delete all aadhar images?');

      if (isConfirmed) {
        try {
          // Check if there's an existing document ID
          if (this.currentDocumentId) {
            try {
              // Call Vuex action to delete passport images
              await this.delete_aadhar({ id: this.currentDocumentId });

              // Clear local image arrays and URLs
              this.aadharimages = [];
              this.existingAadharUrl = '';

              // Optional: Simple alert for success
              alert('Aadhar images deleted successfully');
            } catch (error) {
              console.error('Error deleting images:', error);
              alert('Failed to delete passport images');
            }
          } else {
            // If no document ID, just clear local images
            this.aadharimages = [];
          }
        } catch (error) {
          console.error('Error in removeAllImages:', error);
        }
      }
      // Add similar logic for aadhar and pan if needed
    },
    
    async removeAllpanImages() {

      const isConfirmed = confirm('Are you sure you want to delete all pan images?');

      if (isConfirmed) {
        try {
          // Check if there's an existing document ID
          if (this.currentDocumentId) {
            try {
              // Call Vuex action to delete passport images
              await this.delete_pan({ id: this.currentDocumentId });

              // Clear local image arrays and URLs
              this.panimages = [];
              this.existingPanUrl = '';

              // Optional: Simple alert for success
              alert('Pan images deleted successfully');
            } catch (error) {
              console.error('Error deleting pan images:', error);
              alert('Failed to delete passport images');
            }
          } else {
            // If no document ID, just clear local images
            this.panimages = [];
          }
        } catch (error) {
          console.error('Error in removeAllImages:', error);
        }
      }
      // Add similar logic for aadhar and pan if needed
    },
    removeImage(type, index) {
      switch (type) {
        case 'passport':
          URL.revokeObjectURL(this.passimages[index].url);
          this.passimages.splice(index, 1);
          break;
        case 'aadhar':
          URL.revokeObjectURL(this.aadharimages[index].url);
          this.aadharimages.splice(index, 1);
          break;
        case 'pan':
          URL.revokeObjectURL(this.panimages[index].url);
          this.panimages.splice(index, 1);
          break;
      }
    },
    handledelete(lead) {
      this.opendeleteDialog(lead);
    },
    opendeleteDialog(lead) {
      this.deleteItem = lead;
      this.showDelete = true;
    },
    closeDeleteDialog() {
      this.showDelete = false;
      this.deleteItem = {};
    },
    confirmdelete() {
      if (this.deleteItem.hasOwnProperty('id')) {
        this.delete_leads(this.deleteItem)
          .then(() => {
            console.log('leads deleted successfully');
            this.closeDeleteDialog();
            this.fetchleadData();
          })
          .catch((error) => {
            console.error('Error deleting:', error);
          });
      } else {
        console.error('Unable to delete: id property not found');
      }
    },
    async deletedocuments() {
      try {
        // Confirm deletion
        const confirmed = confirm('Are you sure you want to delete all document details?');

        if (confirmed && this.currentDocumentId) {
          // Call Vuex action to delete documents
          await this.delete_documents({ id: this.currentDocumentId });

          // Reset document-related fields
          this.pass_no = '';
          this.aadhar_no = '';
          this.pan_no = '';
          this.passimages = [];
          this.aadharimages = [];
          this.panimages = [];
          this.existingPassportUrl = '';
          this.existingAadharUrl = '';
          this.existingPanUrl = '';
          this.currentDocumentId = null;

          // Optional: Show success message
          alert('Documents deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting documents:', error);
        alert('Failed to delete documents');
      }
    },
    async fetchleadData() {

      try {

        await this.fetchtotalAllleadCount();
        await this.fetchtotalstaffCount();
        await this.fetchtotalVisaprocessingCount();
        await this.fetchtotalVisaRejectedCount();
        await this.fetchtotalCounsillerAssignedCount();
        await this.fetchtotalDocumentAssignedCount();
        await this.fetchtotalApplicationAssignedCount();
        await this.fetchtotalApplicationNotProcessedLeadCount();
        await this.fetchtotalApplicationOkForProcessingLeadCount();
        await this.fetchtotalApplicationProcessedLeadCount();
        await this.fetchtotalApplicationRecievedLeadCount();
        await this.fetchtotalCaseClosedCount();
        await this.fetchtotalDocumentPendingCount();
        await this.fetchtotalConditionalOfferIssuedCount();
        await this.fetchtotalUnconditionalOfferCount();
        await this.fetchtotalCasIssuedCount();
        await this.fetchtotalCasDocWaitingEdCount();
        await this.fetchtotalInterviewResultsWaitingCount();
        await this.fetchtotalInterviewScheduledCount();
        await this.fetchtotalVisaProcessCount();
        await this.fetchtotalVisaFiledCount();
        await this.fetchtotalVisaRecievedCount();
        await this.fetchtotalCompletedCount();
        await this.fetchtotalDocumentsPendingLeadCount();
        await this.fetchtotalCompleteDocumentationRecievedLeadCount();
        await this.fetchtotalSOPCreatingLeadCount();
        await this.fetchtotalMoveToApplicationLeadCount();
        await this.fetchtotalCounsillerlist();
        await this.fetchtotaldocumentlist();
        await this.fetchtotalapplicationlist();
        await this.fetchtotalremarkListId();
        await this.fetchtotalstatuslist();
        await this.fetchtotalDocuumentstatuslist();
        await this.fetchtotalApplicationlist();
        await this.fetchtotalDocumentlist();

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    },
    async fetchDocuments(leadId) {

      try {
        const response = await this.FETCH_DOCUMENTS(leadId);
        // console.log("API Response for Documents:", response);

        if (response && response.data && response.data.length > 0) {
          const document = response.data[0];
          this.currentDocumentId = document.id || null;
          this.pass_no = document.passport_no || '';
          this.aadhar_no = document.aadhar_no || '';
          this.pan_no = document.pan_no || '';

          // Handling images
          this.existingPassportUrl = document.passport_image || '';
          this.existingAadharUrl = document.aadhar_image || '';
          this.existingPanUrl = document.pan_image || '';

          // Populate image arrays
          this.passimages = this.existingPassportUrl
            ? this.existingPassportUrl.split(',').map((url) => ({ url: url.trim() }))
            : [];
          this.aadharimages = this.existingAadharUrl
            ? this.existingAadharUrl.split(',').map((url) => ({ url: url.trim() }))
            : [];
          this.panimages = this.existingPanUrl
            ? this.existingPanUrl.split(',').map((url) => ({ url: url.trim() }))
            : [];

          this.documentsLoaded = true; // Indicate documents were successfully loaded
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
        this.errorMessage = 'Failed to load existing documents.';
        // this.resetDocumentFields();
      }
    },
    async openUpdateModal(leadId) {
      console.log('Opening modal for lead ID:', leadId);
      // this.resetModalData();
      try {

        const leadData = this.leadsList.find((l) => l.id === leadId);

        if (leadData) {
          this.name = leadData.student_name;
          this.mobile = leadData.mobile;
          this.date = new Date(leadData.date).toISOString().split('T')[0];
          this.address = leadData.address;
          this.country = leadData.country;
          this.source = leadData.lead_source;
          this.tenth = leadData.mark_tenth;
          this.twelth = leadData.mark_twelth;
          this.degree = leadData.mark_degree;
          this.pg = leadData.mark_pg;
          this.ielts = leadData.mark_ielts;
          this.year = leadData.experience_year;
          this.field = leadData.experience_field;
          this.document = leadData.documentAssignId;
          this.counsillerId = leadData.counsillerId;
          this.documentId = leadData.documentId;
          this.applicationId = leadData.applicationId;
          this.studentStatusId = leadData.studentStatusId;
          this.application = leadData.applicationAssignId;
          this.DocumentStatusId = leadData.documentStatusId;
          // this.priorityId = leadData.priorityId;
          this.currentleadId = leadId;
          this.followUpDate = leadData.followup_date
            ? new Date(leadData.followup_date).toISOString().split("T")[0]
            : null;
          this.newfollowUpDate = leadData.followup_documentdate
            ? new Date(leadData.followup_documentdate).toISOString().split("T")[0]
            : null;
          this.AppfollowUpDate = leadData.followup_applicationdate
            ? new Date(leadData.followup_applicationdate).toISOString().split("T")[0]
            : null;
          this.university = leadData.university;
          this.course = leadData.course;

          const remarkDataResponse = await this.fetchtotalremarkListId(leadId);

          if (remarkDataResponse && remarkDataResponse.rows && remarkDataResponse.rows.length > 0) {
            const remarkData = remarkDataResponse.rows[0]; // Access the first remark
            this.Remark = remarkData.remark || ""; // Default to empty if undefined
            this.remarkId = remarkData.id;
            this.newRemarkDate = remarkData.remark_date
              ? new Date(remarkData.remark_date).toISOString().split("T")[0]
              : null;
          } else {
            this.remarkId = null;
            this.Remark = ""; // Default if no remark found
            this.newRemarkDate = null;
          }
          await this.fetchDocuments(leadId);
          this.showUpdate = true;
        } else {
          console.error('No lead found with ID:', leadId);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async saveRemark() {
      try {
        const validRemarkDate = this.remarkDate || new Date().toISOString().split("T")[0];
        if (this.editingRemarkId) {
          // Update existing remark
          const payload = {
            id: this.editingRemarkId,
            remark: this.newRemark,
            remark_date: this.remarkDate,
            leadId: this.currentleadId,
          };
          await this.update_remark(payload); // API call to update remark
          console.log("Remark updated successfully");
        } else {
          // Add new remark
          const payload = {
            remark: this.newRemark,
            remark_date: validRemarkDate,
            leadId: this.currentleadId,
          };
          await this.Add_remark(payload); // API call to add new remark
          console.log("Remark added successfully");
        }
        this.newRemark = "";
        this.remarkDate = "";
        this.editingRemarkId = null;
        this.isAddingRemark = false;
        await this.fetchtotalremarkListId(this.currentleadId); // Refresh remarks
      } catch (error) {
        console.error("Error saving remark:", error);
      }
    },
    editRemark(remark) {
      this.newRemark = remark.remark;
      this.editingRemarkId = remark.id;
      this.remarkDate = remark.remark_date
        ? new Date(remark.remark_date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0]; // Default to current date
      this.isAddingRemark = true;
    },
    async deleteRemark(remark) {
      try {
        console.log("Attempting to delete remark:", remark);
        const confirmDelete = confirm("Are you sure you want to delete this remark?");
        if (confirmDelete) {
          await this.delete_remark({ id: remark }); // Pass the required format to Vuex
          console.log("Remark deleted successfully");
          await this.fetchtotalremarkListId(this.currentleadId); // Refresh remarks list
        }
      } catch (error) {
        console.error("Error deleting remark:", error);
        alert("Failed to delete the remark. Please try again.");
      }
    },
    async updateLead() {

      console.log('leadId:', this.currentleadId);

      const payload = {
        id: this.currentleadId,
        student_name: this.name,
        mobile: this.mobile,
        date: this.date,
        address: this.address,
        country: this.country,
        lead_source: this.source,
        mark_tenth: this.tenth,
        mark_twelth: this.twelth,
        mark_degree: this.degree,
        mark_pg: this.pg,
        mark_ielts: this.ielts,
        experience_year: this.year,
        experience_field: this.field,
        counsillerId: this.counsillerId,
        documentAssignId: this.document,
        university: this.university,
        course: this.course,
        // priorityId: this.priorityId,
        followup_date: this.requiresFollowUpDate ? this.followUpDate : null, // Include if applicable
        followup_documentdate: this.requiresDocFollowUpDate ? this.newfollowUpDate : null, // Include if applicable
        followup_applicationdate: this.requiresAppFollowUpDate ? this.AppfollowUpDate : null, // Include if applicable
        documentId: this.documentId,
        applicationId: this.applicationId,
        applicationAssignId: this.application,
        documentStatusId: this.DocumentStatusId,
        studentStatusId: this.studentStatusId,
      };

      try {
        await this.update_lead(payload);
        console.log('lead updated successfully');

        // Update the local list
        const index = this.leadsList.findIndex((lead) => lead.id === this.currentleadId);
        if (index !== -1) {
          this.leadsList[index] = { ...this.leadsList[index], ...payload };
        }

        if (this.requiresRemark && (this.Remark || this.newRemarkDate)) {
          const remarkPayload = {
            id: this.remarkId,
            leadId: this.currentleadId, // Associate remark with the lead ID
            remark: this.Remark, // The updated remark
            remark_date: this.newRemarkDate, // The updated remark date
          };

          if (this.remarkId) {
            // If remarkId exists, update the existing remark
            remarkPayload.id = this.remarkId;
            await this.update_remark(remarkPayload);
            console.log('Remark updated successfully');
          } else {
            // If remarkId is null, create a new remark
            await this.Add_remark(remarkPayload);
            console.log('New remark created successfully');
          }

        }
        this.showUpdate = false;
        await this.fetchleadData();
      } catch (error) {
        console.error('Error updating lead:', error);
      }
    },

    async addOrUpdateUpload() {
      if (!this.currentleadId) {
        this.errorMessage = 'No lead selected for document upload.';
        return;
      }

      const payload = {
        passport_no: this.pass_no,
        aadhar_no: this.aadhar_no,
        pan_no: this.pan_no,
        leadId: this.currentleadId,
        passport_image: Array.from(new Set(this.passimages.map(img => img.file || img.url))),
        aadhar_image: Array.from(new Set(this.aadharimages.map(img => img.file || img.url))),
        pan_image: Array.from(new Set(this.panimages.map(img => img.file || img.url))),



      };

      console.log('Payload:', payload);

      try {
        if (this.currentDocumentId) {
          await this.UPDATE_UPLOAD({
            id: this.currentDocumentId,
            ...payload
          });
          console.log('Documents updated successfully');
        } else {
          await this.ADD_UPLOAD(payload);
          console.log('Documents uploaded successfully');
        }
        await this.fetchDocuments(this.currentleadId);
      } catch (error) {
        console.error('Error handling documents:', error);
        this.errorMessage = 'Failed to process documents. Please try again.';
      }
    },
  },
  async mounted() {
    await this.fetchleadData();
  }
});
</script>

<style scoped>
/* Dashboard Grid Layout */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
}

/* Card Base Styles */
.metric-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.metric-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Card Content Layout */
.metric-content {
  padding: 1.5rem;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  position: relative;
  z-index: 1;
}

/* Icon Styling */
.metric-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: all 0.3s ease;
}

.metric-card:hover .metric-icon {
  transform: scale(1.1);
}

/* Card Type-Specific Colors */
.total-staff .metric-icon {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
}

.total-students .metric-icon {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.counselor-leads .metric-icon {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.document-leads .metric-icon {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
}

.visa-processing .metric-icon {
  background: linear-gradient(135deg, #8b5cf6, #6d28d9);
  color: white;
}

.visa-status .metric-icon {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

/* Metric Details */
.metric-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.metric-details h3 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4b5563;
}

.metric-details p {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}

/* Trend Indicators */
.metric-trend {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.metric-trend.positive {
  color: #059669;
}

.metric-trend.negative {
  color: #dc2626;
}

.metric-trend.neutral {
  color: #6b7280;
}

.metric-trend.warning {
  color: #d97706;
}

/* Ripple Effect */
.ion-ripple-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

/* Card Loading Animation */
@keyframes cardFadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.metric-card {
  animation: cardFadeIn 0.5s ease-out forwards;
}

/* Staggered Animation Delay */
.dashboard-grid .metric-card:nth-child(1) { animation-delay: 0.1s; }
.dashboard-grid .metric-card:nth-child(2) { animation-delay: 0.2s; }
.dashboard-grid .metric-card:nth-child(3) { animation-delay: 0.3s; }
.dashboard-grid .metric-card:nth-child(4) { animation-delay: 0.4s; }
.dashboard-grid .metric-card:nth-child(5) { animation-delay: 0.5s; }
.dashboard-grid .metric-card:nth-child(6) { animation-delay: 0.6s; }

/* Hover Glow Effect */
.metric-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.metric-card:hover::after {
  opacity: 0.6;
}

/* Number Counter Animation */
@keyframes countUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.metric-details p {
  animation: countUp 0.5s ease-out forwards;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
    padding: 1rem;
  }
  
  .metric-content {
    padding: 1rem;
  }
  
  .metric-icon {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
  
  .metric-details p {
    font-size: 1.25rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .metric-card {
    background: #1f2937;
  }
  
  .metric-details h3 {
    color: #9ca3af;
  }
  
  .metric-details p {
    color: #f3f4f6;
  }
}
.welcome-card {
  background: linear-gradient(135deg, #4c8dff, #3171e0);
  color: white;
  margin-bottom: 1rem;
}

.welcome-card ion-card-subtitle,
.welcome-card ion-card-title {
  color: white;
}

.stat-card {
  text-align: center;
  --background: #f8f9fa;
}

.stat-icon {
  font-size: 2rem;
  color: #3171e0;
  margin-bottom: 0.5rem;
}

.stat-card h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: #2d3748;
}

.stat-card p {
  margin: 0;
  color: #718096;
}

ion-item {
  --padding-start: 1rem;
  --inner-padding-end: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
}



.main-container {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.select-card {
  margin-bottom: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.select-item {
  --background: transparent;
}

.custom-select {
  --placeholder-color: #6c757d;
  --placeholder-opacity: 0.8;
}

.user-list-container {
  margin: 1rem 0;
  max-height: 300px;
  overflow-y: auto;
}

.user-item-card {
  margin-bottom: 0.75rem;
  transition: transform 0.2s;
}

.user-item-card:hover {
  transform: translateX(4px);
}

.user-list-item {
  --background: white;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.username {
  font-weight: 600;
  color: #2d3748;
}

.leads-container {
  margin-top: 2rem;
}

.leads-title {
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 1rem;
  font-weight: 600;
}

.lead-type-options {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.lead-type-options ion-button {
  --border-radius: 20px;
  --padding-start: 1.5rem;
  --padding-end: 1.5rem;
}

.lead-type-options .active {
  --background: var(--ion-color-primary-shade);
}

.lead-card {
  margin-bottom: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
}

.lead-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.lead-item {
  --padding-start: 1rem;
  --padding-end: 1rem;
  --inner-padding-end: 0;
}

.lead-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0.5rem 0;
}

.status-badge.pending {
  background: #fed7aa;
  color: #9a3412;
}

.status-badge.active {
  background: #bbf7d0;
  color: #166534;
}

.info-grid {
  margin-top: 0.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #64748b;
  font-size: 0.875rem;
}

.info-icon {
  font-size: 1rem;
  color: #94a3b8;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  --padding-start: 0.5rem;
  --padding-end: 0.5rem;
}

.edit-icon {
  color: #0ea5e9;
  font-size: 1.25rem;
}

.view-icon {
  color: #6366f1;
  font-size: 1.25rem;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

</style>