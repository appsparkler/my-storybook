import moment from 'moment'
import {
  reducePunchedSlotsToGoalAccomplished,
  verifyNewInTime, verifyNewOutTime
} from '../utils'

describe("reducePunchedSlotsToGoalAccomplished", () => {
  it(`SHOULD correctly return the goal accomplished
    in minutes given the punched slots.`, () => {
    const punchedSlots = [{
      id: '1234',
      inTime: moment('09:52', 'HH:mm').valueOf().toString(),
      outTime: moment('09:55', 'HH:mm').valueOf().toString()
    }];
    const results = punchedSlots
      .reduce(reducePunchedSlotsToGoalAccomplished, 0)
    expect(results).toBe(3)
  })

  it(`SHOULD not include the slot if out-time is null/falsy`, () => {
    const punchedSlots = [{
      id: '1234',
      inTime: moment('09:52', 'HH:mm').valueOf().toString(),
      outTime: moment('09:55', 'HH:mm').valueOf().toString()
    }, {
      id: '1235',
      inTime: moment('10:52', 'HH:mm').valueOf().toString(),
      outTime: null
    }]
    const results = punchedSlots.reduce(reducePunchedSlotsToGoalAccomplished, 0);
    expect(results).toBe(3)
  })
});

describe("verifyNewInTime", () => {
  let slots = []

  beforeEach(() => {
    const toTimestamp = (time) => moment(time, 'YYYY-MM-DD HH:mm')
      .valueOf();
    slots = [{
      index: 0,
      id: '8e038ad6-d65f-42ea-af9b-9727c23801b7',
      inTime: toTimestamp("2020-11-20 12:00"),
      outTime: toTimestamp("2020-11-20 12:30"),
      punchInTimeCell: {
        value: '2020-11-20 12:00'
      },
      punchOutTimeCell: {
        value: '2020-11-20 12:30'
      }
    }, {
      index: 1,
      id: 'd6dad402-970a-4555-8ca2-083bbe695025',
      inTime: toTimestamp("2020-11-20 13:00"),
      outTime: toTimestamp("2020-11-20 13:30"),
      punchInTimeCell: {
        value: '2020-11-20 13:00'
      },
      punchOutTimeCell: {
        value: '2020-11-20 13:30'
      }
    }]
  })

  it(`SHOULD invalidate
        IF time-string is not-valid`, () => {
    const result = verifyNewInTime({
      newInTime: '9999-23-23 92:93',
    })
    expect(result.isValid).toBe(false);
  });

  it(`SHOULD invalidate
        IF new-in-time < current-time`, () => {
    const systemTime = moment('2020-11-21 14:23').valueOf();
    jest
      .useFakeTimers('modern')
      .setSystemTime(systemTime);
    const args = {
      "newInTime": "2020-11-21 14:28",
      "slots": [
        {
          "index": 0,
          "id": "93b01d98-344e-40ec-a918-8fdeb8929348",
          "inTime": 1605948828947,
          "outTime": null,
          "punchInTimeCell": {
            "value": "2020-11-21 14:23",
            "mask": "9999-99-99 99:99"
          },
          "punchOutTimeCell": {
            "value": null,
            "mask": "9999-99-99 99:99"
          },
          "punchOutButton": {
            "text": "Punch Out",
            "iconProps": {
              "iconName": "Leave",
              "className": "punchOutIcon-155"
            }
          }
        }
      ],
      "item": {
        "id": "93b01d98-344e-40ec-a918-8fdeb8929348",
        "inTime": 1605948828947,
        "outTime": null
      }
    };
    const results = verifyNewInTime(args);
    expect(results.isValid).toBe(false)
  })

  it(`SHOULD invalidate
        IF new-in-time is less than out-time of prevous slot`, () => {
    const result = verifyNewInTime({
      newInTime: '2020-11-20 12:15',
      slots,
      item: slots[1]
    })
    expect(result.isValid).toBe(false)
  })

  it(`SHOULD invalidate
        IF new-in-time is greater than out-time of the slot`, () => {
    const result = verifyNewInTime({
      newInTime: '2020-11-20 13:45',
      slots,
      item: slots[1]
    })
    expect(result.isValid).toBe(false)
  })

  it(`SHOULD return valid
        IF (new-in-time is > out-time of previous-slot
        AND new-in-time is < out-time of current-slot)`, () => {
    const result4 = verifyNewInTime({
      newInTime: '2020-11-20 13:15',
      slots,
      item: slots[1]
    })
    expect(result4.isValid).toBe(true)
  });

  it(`SHOULD invalidate
        IF slot-in-time < previous-slot-out-time`, () => {
    const punchedSlots = [{
      "index": 0,
      "id": "ba42d17c-54e1-43d5-ae00-e233ca951451",
      "inTime": 1605919681633,
      "outTime": 1605919681633,
      "punchInTimeCell": {
        "value": "2020-11-21 06:18",
        "mask": "9999-99-99 99:99"
      },
      "punchOutTimeCell": {
        "value": "2020-11-21 06:18",
        "mask": "9999-99-99 99:99"
      },
      "punchOutButton": {
        "text": "Punch Out",
        "iconProps": {
          "iconName": "Leave",
          "styles": {
            "root": {
              "transform": "rotate(180deg)"
            }
          }
        }
      }
    }, {
      "index": 1,
      "id": "0ac64964-97bc-4ded-8274-0b10d680cd6f",
      "inTime": 1605923100000,
      "outTime": null,
      "punchInTimeCell": {
        "value": "2020-11-21 07:15",
        "mask": "9999-99-99 99:99"
      },
      "punchOutTimeCell": {
        "value": null,
        "mask": "9999-99-99 99:99"
      },
      "punchOutButton": {
        "text": "Punch Out",
        "iconProps": {
          "iconName": "Leave",
          "styles": {
            "root": {
              "transform": "rotate(180deg)"
            }
          }
        }
      }
    }];
    const results = verifyNewInTime({
      slots: punchedSlots,
      item: punchedSlots[1],
      newInTime: '2020-11-21 06:25'
    })
    expect(results.isValid).toBe(true)
  });

  it(`test-case from app : 1`, () => {
    const slots = [{
      "index": 0,
      "id": "42315606-c52c-4547-8de4-e8abbed4fb11",
      "inTime": 1605920886987,
      "outTime": 1605920886987,
      "punchInTimeCell": {
        "value": "2020-11-21 06:38",
        "mask": "9999-99-99 99:99"
      },
      "punchOutTimeCell": {
        "value": "2020-11-21 06:38",
        "mask": "9999-99-99 99:99"
      },
      "punchOutButton": {
        "text": "Punch Out",
        "iconProps": {
          "iconName": "Leave",
          "styles": {
            "root": {
              "transform": "rotate(180deg)"
            }
          }
        }
      }
    }, {
      "index": 1,
      "id": "d715ca70-c544-4622-b970-d2979a329753",
      "inTime": 1605920220000,
      "outTime": null,
      "punchInTimeCell": {
        "value": "2020-11-21 06:27",
        "mask": "9999-99-99 99:99"
      },
      "punchOutTimeCell": {
        "value": null,
        "mask": "9999-99-99 99:99"
      },
      "punchOutButton": {
        "text": "Punch Out",
        "iconProps": {
          "iconName": "Leave",
          "styles": {
            "root": {
              "transform": "rotate(180deg)"
            }
          }
        }
      }
    }]
    const newInTime = '2020-11-21 06:27'
    const item = slots[1];
    const results = verifyNewInTime({newInTime, item, slots});
    expect(results.isValid).toBe(false);
  })

  it(`test-case from app : 2`, () => {
    const args = {
    "newTimeValidity": {
      "isValid": true
    },
    "newInTime": "2020-11-21 10:24",
    "slots": [
      {
        "index": 0,
        "id": "d009f566-f3ca-45f5-8984-cf7b7b2370a2",
        "inTime": 1605934637290,
        "outTime": 1605934637290,
        "punchInTimeCell": {
          "value": "2020-11-21 10:27",
          "mask": "9999-99-99 99:99"
        },
        "punchOutTimeCell": {
          "value": "2020-11-21 10:27",
          "mask": "9999-99-99 99:99"
        },
        "punchOutButton": {
          "text": "Punch Out",
          "iconProps": {
            "iconName": "Leave",
            "styles": {
              "root": {
                "transform": "rotate(180deg)"
              }
            }
          }
        }
      },
      {
        "index": 1,
        "id": "14e39d15-cc7b-41d0-b541-77a91ce2aa1e",
        "inTime": 1605934680000,
        "outTime": null,
        "punchInTimeCell": {
          "value": "2020-11-21 10:28",
          "mask": "9999-99-99 99:99"
        },
        "punchOutTimeCell": {
          "value": null,
          "mask": "9999-99-99 99:99"
        },
        "punchOutButton": {
          "text": "Punch Out",
          "iconProps": {
            "iconName": "Leave",
            "styles": {
              "root": {
                "transform": "rotate(180deg)"
              }
            }
          }
        }
      }
    ],
    }  ;
    const results = verifyNewInTime({
      ...args, item: args.slots[1]});
    expect(results.isValid).toBe(false);
  })
})

describe("verifyNewOutTime", () => {

  it(`SHOULD  invalidate
        IF newOutTime is > current-time`, () => {
    const args = {
      "newOutTime": "2020-11-21 11:31",
      "currentTime": "2020-11-21 11:30",
      "modifiedItems": [
        {
          "index": 0,
          "id": "cb6e2871-b435-482e-9e1e-82b61ef27ed7",
          "inTime": 1605938337666,
          "outTime": 1605938337666,
          "punchInTimeCell": {
            "value": "2020-11-21 11:28",
            "mask": "9999-99-99 99:99"
          },
          "punchOutTimeCell": {
            "value": "2020-11-21 11:28",
            "mask": "9999-99-99 99:99"
          },
          "punchOutButton": {
            "text": "Punch Out",
            "iconProps": {
              "iconName": "Leave",
              "className": "punchOutIcon-155"
            }
          }
        }
      ],
      "id": "cb6e2871-b435-482e-9e1e-82b61ef27ed7"
    };
    const results = verifyNewOutTime(args);
    expect(results.isValid).toBe(false);
  })

  it(`SHOULD invalidate
        IF newOutTime is invalid`, () => {
    const args = {
      "newOutTime": "2020-11-21 81:30",
      "modifiedItems": [
        {
          "index": 0,
          "id": "cb6e2871-b435-482e-9e1e-82b61ef27ed7",
          "inTime": 1605938337666,
          "outTime": 1605938337666,
          "punchInTimeCell": {
            "value": "2020-11-21 11:28",
            "mask": "9999-99-99 99:99"
          },
          "punchOutTimeCell": {
            "value": "2020-11-21 11:28",
            "mask": "9999-99-99 99:99"
          },
          "punchOutButton": {
            "text": "Punch Out",
            "iconProps": {
              "iconName": "Leave",
              "className": "punchOutIcon-155"
            }
          }
        }
      ],
      "id": "cb6e2871-b435-482e-9e1e-82b61ef27ed7"
    };
    const results = verifyNewOutTime(args);
    expect(results.isValid).toBe(false)
  })

  it(`SHOULD invalidate
        IF new-out-time < in-time`,
    () => {
      const args = {
        "newOutTime": "2020-11-21 11:26",
        "modifiedItems": [
          {
            "index": 0,
            "id": "cb6e2871-b435-482e-9e1e-82b61ef27ed7",
            "inTime": 1605938337666,
            "outTime": 1605938337666,
            "punchInTimeCell": {
              "value": "2020-11-21 11:28",
              "mask": "9999-99-99 99:99"
            },
            "punchOutTimeCell": {
              "value": "2020-11-21 11:28",
              "mask": "9999-99-99 99:99"
            },
            "punchOutButton": {
              "text": "Punch Out",
              "iconProps": {
                "iconName": "Leave",
                "className": "punchOutIcon-155"
              }
            }
          }
        ],
        "id": "cb6e2871-b435-482e-9e1e-82b61ef27ed7"
      };
      const results = verifyNewOutTime(args);
      expect(results.isValid).toBe(false);
    })

  it(`SHOULD invalidate
        IF new-out-time > next-slot-in-time`, () => {
    const args = {
      "newOutTime": "2020-11-21 11:59",
      "modifiedItems": [
        {
          "index": 0,
          "id": "cb6e2871-b435-482e-9e1e-82b61ef27ed7",
          "inTime": 1605938337666,
          "outTime": 1605938337666,
          "punchInTimeCell": {
            "value": "2020-11-21 11:28",
            "mask": "9999-99-99 99:99"
          },
          "punchOutTimeCell": {
            "value": "2020-11-21 11:28",
            "mask": "9999-99-99 99:99"
          },
          "punchOutButton": {
            "text": "Punch Out",
            "iconProps": {
              "iconName": "Leave",
              "className": "punchOutIcon-155"
            }
          }
        },
        {
          "index": 1,
          "id": "5be244aa-5cd4-48a0-83eb-0a50c357de4d",
          "inTime": 1605939900222,
          "outTime": null,
          "punchInTimeCell": {
            "value": "2020-11-21 11:55",
            "mask": "9999-99-99 99:99"
          },
          "punchOutTimeCell": {
            "value": null,
            "mask": "9999-99-99 99:99"
          },
          "punchOutButton": {
            "text": "Punch Out",
            "iconProps": {
              "iconName": "Leave",
              "className": "punchOutIcon-155"
            }
          }
        }
      ],
      "id": "cb6e2871-b435-482e-9e1e-82b61ef27ed7"
    }
    const results = verifyNewOutTime(args);
    expect(results.isValid).toBe(false);

  })

  it(`SHOULD return valid
        IF new-out-time is not invalid`,
  () => {
    const args = {
      "newOutTime": "2020-11-21 11:54",
      "modifiedItems": [
        {
          "index": 0,
          "id": "cb6e2871-b435-482e-9e1e-82b61ef27ed7",
          "inTime": 1605938337666,
          "outTime": 1605938337666,
          "punchInTimeCell": {
            "value": "2020-11-21 11:28",
            "mask": "9999-99-99 99:99"
          },
          "punchOutTimeCell": {
            "value": "2020-11-21 11:28",
            "mask": "9999-99-99 99:99"
          },
          "punchOutButton": {
            "text": "Punch Out",
            "iconProps": {
              "iconName": "Leave",
              "className": "punchOutIcon-155"
            }
          }
        },
        {
          "index": 1,
          "id": "5be244aa-5cd4-48a0-83eb-0a50c357de4d",
          "inTime": 1605939900222,
          "outTime": null,
          "punchInTimeCell": {
            "value": "2020-11-21 11:55",
            "mask": "9999-99-99 99:99"
          },
          "punchOutTimeCell": {
            "value": null,
            "mask": "9999-99-99 99:99"
          },
          "punchOutButton": {
            "text": "Punch Out",
            "iconProps": {
              "iconName": "Leave",
              "className": "punchOutIcon-155"
            }
          }
        }
      ],
      "id": "cb6e2871-b435-482e-9e1e-82b61ef27ed7"
    }
    const results = verifyNewOutTime(args);
    expect(results.isValid).toBe(true)
  })
})
