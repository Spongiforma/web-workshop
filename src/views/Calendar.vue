<template>
  <v-container fluid>
    <v-card>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          v-model="focus"
          ref="calendar"
          color="primary"
          type="week"
          @click:event="showEvent"
          :events="events"
        >

          <template v-slot:day-body="{ date, week }">
            <div
              class="v-current-time"
              :class="{ first: date === week[0].date }"
              :style="{ top: nowY }"
            ></div>
          </template>

        </v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Calendar",
  data: function () {
    return {
      focus: "",
      name: "",
      mainOut: "",
      country: "Singapore",
      darkTheme: this.$vuetify.theme.dark,
      events: [
        {
          name: "Weekly Meeting",
          start: "2021-07-07 09:00",
          end: "2019-01-07 10:00",
        },
        {
          name: `Thomas' Birthday`,
          start: "2021-07-10",
        },
        {
          name: "Mash Potatoes",
          start: "2021-08-09 12:30",
          end: "2021-08-09 15:30",
          details: "Die Time"
        },
        {
          "name": "Hari Raya Haji",
          "start": "2021-07-20",
          "details": "<p><strong>20<sup>th</sup> Jul 2021</strong></p>\n"
        },
        {
          "name": "AAP III",
          "start": "2021-08-02 15:00",
          "end": "2021-08-02 16:00",
          "details": "<p><strong>2<sup>nd</sup> Aug 2021</strong></p>\n<p><strong>1500</strong> - <strong>1600</strong></p>\n"
        },
        {
          "name": "Research Congress",
          "start": "2021-02-24 07:40",
          "end": "2021-02-24 12:30",

          "details": "<p><strong>24<sup>th</sup> Feb 2021</strong></p>\n<p><strong>0740</strong> - <strong>1230</strong></p>\n<p>Students from Year 5 and 6, and selected students from Year 3 and 4, will be involved in the NUS High School Research Congress on 24 February.</p>\n<p>Students are to arrive in school by 7.40 am, and the poster session is expected to commence from 9.25 am onwards, after the morning keynote guest lecture by Dr Lim Khiang Wee, Executive Director, CREATE, National Research Foundation, Prime Minister&#39;s Office. The keynote lecture will be about the research ongoing at CREATE (Campus for Research Excellence and Technological Enterprise).</p>\n<p>The following is the schedule for the Research Congress:</p>\n<table>\n<thead>\n<tr>\n<th>Time</th>\n<th>Event</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>0740 hrs</td>\n<td>Students arrive in school, proceed to mentor classrooms</td>\n</tr>\n<tr>\n<td>0810 hrs</td>\n<td>Welcome Address by Ms Soh Lai Leng, Principal of NUS High School</td>\n</tr>\n<tr>\n<td>0820 hrs</td>\n<td>Keynote Lecture by Dr Lim Khiang Wee, Executive Director, CREATE, National Research Foundation, Prime Minister&#39;s Office about the research ongoing at CREATE (Campus for Research Excellence and Technological Enterprise).</td>\n</tr>\n<tr>\n<td>0850 hrs</td>\n<td>Oral Presentation by selected by NUS High School students (4 projects, about 8 mins/proj)</td>\n</tr>\n<tr>\n<td>0925 hrs</td>\n<td>Start of poster sessions at the 8 venues</td>\n</tr>\n<tr>\n<td>1030 hrs</td>\n<td>Start of grading at the 8 venues</td>\n</tr>\n</tbody>\n</table>\n<p>There will be a total of 370+ students at the Research Congress:</p>\n<ul>\n<li>Year 6: 172</li>\n<li>Year 5: 174</li>\n<li>Year 3 - 4: 20+</li>\n</ul>\n<p>About 220 students will be presenting at the poster sessions, amounting to a total of ~ 120 posters. 150 students will be audience members.</p>\n<p>Students will be distributed across 8 venues as part of Safe Management Measures. The following are these venues:</p>\n<ul>\n<li>Hall - 2 venues</li>\n<li>Indoor Sports Hall - 2 venues</li>\n<li>Library - 2 venues (Electron and Event Horizon)</li>\n<li>Concourse - 2 venues</li>\n</ul>\n<p>These venues will be partitioned by chairs. At each venue, a maximum of 50 people can be present at a time, consisting of about 30 presenters and 20 audience members. One poster can have 1-3 presenters, and at any one time, up to 8 students, including presenters, are allowed to gather at one panel of 2 posters to view posters. These panels will be 4m apart.</p>\n<p>However, in the concourse, panels will be shaped in an X-shape for a maximum of 8 posters. In each quadrant of this X-shape, 8 students, including presenters, are allowed to gather.</p>\n"
        },
        {
          "name": "W@W Festival",
          "start": "2021-02-24 13:30",
          "end": "2021-02-24 18:00",
          "details": "<p><strong>24<sup>th</sup> Feb 2021</strong></p>\n<p><strong>1330</strong> - <strong>1800</strong></p>\n<p>Students from Year 1 to 4 will be involved in the Wonderment@Work (W@W) Learning Festival. The project grading during this festival will commence from 1.30 pm onwards. Students should should have their lunch before reporting to school for this event.</p>"
        },
        {
          name: "March Holidays",
          start: "2021-03-13",
          end: "2021-03-21",
          details: "First Term Break of the Year! How's about that?"
        }

      ],
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      value: "",
      ready: false,
    };
  },
  computed: {
    cal () {
      return this.ready ? this.$refs.calendar as HTMLElement : null;
    },
    nowY () {
      return this.cal ? this.cal.timeToY(this.cal.times.now) + "px" : "-10px";
    },
  },
  mounted: function () {
    this.ready = true;
    this.cal.scrollToTime();
    this.updateTime();

  },
  methods: {
    getEventColor (event) {
      return event.color;
    },
    setToday () {
      this.focus = "";
    },
    prev () {
      this.cal.prev();
    },
    next () {
      this.cal.next();
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true));
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    getCurrentTime () {
      return this.cal ? this.cal.times.now.hour * 60 + this.cal.times.now.minute : 0;
    },
    scrollToTime () {
      const time = this.getCurrentTime();
      const first = Math.max(0, time - (time % 30) - 30);
      this.cal.scrollToTime(first);
    },
    updateTime () {
      setInterval(() => this.cal.updateTimes(), 60 * 1000);
    },

  }
});
</script>

<style lang="scss">
.v-current-time {
  height: 2px;
  background-color: #ea4335;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;
  &.first::before {
    content: '';
    position: absolute;
    background-color: #ea4335;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: -5px;
    margin-left: -6.5px;
  }
}
</style>
